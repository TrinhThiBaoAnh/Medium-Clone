import axios from "axios";
import { useContext, useEffect, useInsertionEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import RecommendedPosts from "../recommendedPosts/RecommendedPosts";
import "./singlePost.css";
import React from "react";
import Comment from "../../components/comment/Comment";
import {
  FacebookShareCount,
  FacebookIcon,
  TwiterShareCount,
  TwitterIcon,
  FacebookShareButton,
  TwitterShareButton
 
} from "react-share";
import Editor from "./Editor";
import MyEditor from "./MyEditor";
export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  
  let postObj = { 
    postId:0,
    title: "",
    shortDesc: "",
    desc:"",
    photo: "",
    authorId:0,
    categories: [],
    tags:[],
    views: 0,
    likes:[],
    shares:[],
    published: false,
    comments: {},
  };
  const [post, setPost] = useState(postObj);
  const PF = "http://localhost:5000/images/";
  const { user, dispatch } = useContext(Context);
  // console.log(user);
  const [desc, setDesc] = useState("");
  const [authorId, setAuthorId] = useState(1);
  let profilePic ="";
  let isPro = false;
  
  // let author_id ="";
  const [updateMode, setUpdateMode] = useState(false);
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [warning, setWarning] =  useState("");
  const [followers, setFollowers] = useState(0);
  const defaultComment = {
    text: "",
    userId: "",
    postId: post._id,
  }
  let authorName = "";
  let expiredDate = new Date();
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setAuthorId(res.data.authorId);
      setTags(res.data.tags);
      if (res.data.likes.length > 0) {
        res.data.likes.map((item, index) => {
          if (user!= null && item === user.userId) 
          setActive1(true);
        })
      }
      if (user!= null && user.readingList.length > 0) {
        user.readingList.map((item, index) => {
          if (item === res.data._id) 
          setActive2(true);
        })
      }
      if (user!= null && user.followings.length > 0) {
        user.followings.map((item, index) => {
          if (item === res.data.authorId) 
          setActive3(true);
        })
      }
      
    };
    getPost();
  // console.log(user.followings);
  }, [path]);
  const [members,setMembers] = useState([]);
  // const [editor, setEditor] = useState(post.desc);
  useEffect(() => {
    const getMembers = async () => {
      const res = await axios.get("/members");
      setMembers(res.data);
    };
    getMembers();
  }, []);
  // console.log('members',user);
  let checkMember  = (user!==null) ? user.isMember : false;
  let current = new Date();
  // console.log('current', current.getTime());
  if(members.length > 0 &&  user!=null){
    for (var i = 0;i <members.length;i++){
    if (members[i].user_id === user._id){
      var expired_date = new Date(members[i].end_date);
      console.log('end_date', expired_date); 
      if (expired_date.getTime() < current.getTime()){
          user.isMember = false;
          checkMember= false;
          // console.log(members[i]);
      }
      else{
        user.isMember = true;
          checkMember= true;
      }
    }  
  }
  }
  console.log('checkMember', checkMember);
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("/users");
      setUsers(res.data);
    };
    const fetchPosts = async () => {
      const res = await axios.get("/posts");
      setPosts(res.data);
    };
    fetchPosts();
    getUsers();
  }, []);
 
  for (var i = 0;i<users.length;i++){
    if (users[i].userId == post.authorId){
      authorName = users[i].username;
      profilePic = users[i].profilePic;
      isPro = users[i].isPro;
      break;
    }
  };
  const getFollowers = async () => {
    const res2 = await axios.get("/users/followers/" + post.authorId);
    // console.log('/users/followers/', res2.data);
    setFollowers(res2.data.length);
  };
  getFollowers();
  // alert(followers);
  const handleDelete = async () => {
    if(window.confirm("Bạn chắc chắn muốn xoá?") == true){
      try {
        await axios.delete(`/posts/${post._id}`, {
          data: { authorId: user.userId },
        });
        window.location.replace("/");
      } catch (err) {}
    }else{
      
    }
  };
  const handleUpdate = async () => {
  
    try {
      await axios.put(`/posts/${post._id}`, {
        authorId: user.userId,
        title: post.title,
        desc: desc
      });
      setUpdateMode(false)
    } catch (err) {}
  };
  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert('Link Copied');
    
  }
  const handleLike = async () => {
    if (user != null){
    if (active1) {
      if (post.likes.indexOf(user.userId) != -1)
      {
          // arr.pop()
          post.likes.pop(user.userId);
      }
      try{
        await axios.put(`/posts/${post._id}`, {
          likes: post.likes,
        });
      } catch(e){}
      
    } else {
      if (post.likes.indexOf(user.userId) == -1)
      {
          // setLikes(arr.length + 1);
          post.likes.push(user.userId);
      }
      try{
        await axios.put(`/posts/${post._id}`, {
          likes: post.likes,
        });
      } catch(e){}
    }
    setActive1(!active1);
    }
    else{
      alert("Please login to continue your action!");
    }
    // setIsClicked(!isClicked);
  };
  const handleAdding = async (e)=>{
    if (user != null){
    e.preventDefault();
    setActive2(!active2);
    
    if (!active2) alert("Adding to Reading List!");
    else alert("Remove from Reading List!");
    dispatch({ type: "UPDATE_START" });
    try {
      let currentRL = user.readingList;
      if (currentRL.indexOf(post._id) == -1)
      {
        currentRL.push(post._id); 
      }
      else{
        currentRL.splice(currentRL.indexOf(post._id), 1);
      }
      // console.log(currentRL);
      const updatedUser = {
        id: user._id,
        readingList: currentRL,
      };
      try {
        const res = await axios.put("/users/" + user._id, updatedUser);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
      }
    } catch (err) {}
  }
  else{
    alert("Please login to continue your action!");
  }
  }
  const handleFollow = async (e) => {
    // console.log('handleFollow',active3)
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    if (active3) {
      try{
        const res = await axios.put(`/users/${user._id}/unfollow`, {
          userId: post.authorId
        });
        // console.log(res);
        setFollowers(followers - 1 );
        if (res.status==200){
          setActive3(!active3);
        }
        
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      } catch(e){ 
        dispatch({ type: "UPDATE_FAILURE" });
        
      }
    } else {
      try{
        const res =  await axios.put(`/users/${authorId}/follow`, {
          userId: user._id
        });
        setFollowers(followers + 1 );
        if (res.status==200){
          setActive3(!active3);
        }
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      } catch(e){
        dispatch({ type: "UPDATE_FAILURE" });
        
      }
    }
    
    // setFollowers();
  };
  // console.log("Check", isPro, user, checkMember);
  return (
    <div className="singlePostContainer">
      <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={post.title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setPost({...post, title: e.target.value})}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
            {user && post.authorId === user.userId && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.authorId}`} className="link">
              <b> {authorName}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <div className="viewLikeShare">
            <div className="viewLikeShare-left">
              {/* <span className="singlePostView">
                <p>View: {post.views}</p>
              </span>
              <span className="singlePostLike">
                <p>Likes: { post.likes.length}</p>
              </span>
              <span className="singlePostShare">
                <p>Shares: 

                <FacebookShareCount url={window.location.href}>
                    {shareCount => <span className="myShareCountWrapper">{shareCount}</span>}
                </FacebookShareCount>
                </p>
              </span> */}
            </div>
            <div className="viewLikeShare-right"> 
              
              <div className="fb-share">
              <FacebookShareButton
                url={window.location.href}
                quote={""}
                hashtag={"#medium"}
                description={"facebook share button"}
                className="fbshare">
                    <FacebookIcon size={28} round />
              </FacebookShareButton>
              </div>
              <div className="twitter-share">
              <TwitterShareButton
                url={window.location.href}
                quote={""}
                hashtag={"#medium"}
                description={"twitter share button"}
                className="twittershare">
                    <TwitterIcon size={28} round></TwitterIcon>
              </TwitterShareButton>
              </div>
              <div className="copy-link">
                    <i  className="sidebarIcon-post fa fa-link" 
                        aria-hidden="true" 
                        onClick={handleCopy}
                        >
                    </i>
              </div>
              <div className="like">
                <i  className="sidebarIcon-post fa fa-heart" 
                    aria-hidden="true" 
                    onClick={handleLike}
                    style={{color: active1 ? "red" : "grey" }}>
                
                </i>
                <p>{ post.likes.length}</p>
              </div>
              <div className="adding"> 
             
                <i  className="sidebarIcon-post fa fa-bookmark"  
                    aria-hidden="true" 
                    onClick={handleAdding}
                    style={{color: active2 ? "green" : "grey" }}></i>
                
              </div>
            </div>
        </div>
        <br></br>
        {
          (isPro && (!checkMember) && authorId!==user.userId) ? (
              <div>
              <div className="notify-membership">
              <h2>Read this story from <i>{authorName}</i>— and everything else on Medium.</h2>
              <ul className="ul-notify-membership">
                <li>Dive deeper into the topics that matter to you</li>
                <li>Get in-depth articles answering thousands of questions</li>
                <li>Achieve your personal and professional goals</li>
              </ul>
              <Link to="/plans">
              <button className="buttonx button3x"><span>Get unlimited access</span></button>
              </Link>
              
            </div>
            </div>
            ) : (
              <div>
              {updateMode ? (
                // <textarea
                //   className="singlePostDescInput"
                //   value={post.desc}
                //   onChange={(e) => setDesc(e.target.value)}
                // />
                <MyEditor
                handleChange={(data) => {
                  setDesc(data);
                  setPost({...post, desc: data});
                }}
                data={post.desc}
                
                />
              ) : (
                <p className="singlePostDesc" dangerouslySetInnerHTML={{__html: post.desc}}>{}</p>
              )}
              {updateMode && (
                <button className="singlePostButton" onClick={handleUpdate}>
                  Update
                </button>
              )}
              <div className="tag-section">
                <h4>Tags:</h4>
                {
                  tags.map((t) => (
                  <span className="tag-span">{t}</span>
                ))}
              </div>
              <div className="comment-section">
                  {(user && post) && <Comment user={user} post ={post}></Comment>}
              </div>
              </div> 
            )
        }
      </div>
      
      <div className="relatedPosts">
        <br></br>
        <hr className="related-hoziron"></hr>
        <h2 className="related-title">More from Medium</h2>
        <RecommendedPosts recommendedPosts={posts.slice(0, 3)}/>
      </div>
    </div>
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT AUTHOR</span>
        <Link to={`/profile/${post.authorId}`}>
          <img
          src={PF + profilePic}
          alt=""
          style={{width:200}}
          />
        </Link>
      <span className="authorName">{authorName}</span>
      <span className="authorFollowers">{followers} Followers</span>
      </div>
      <div className="div-follow">
        <button type="submit" id ="btnFollow" className="btn-follow" onClick={handleFollow}>{active3 ? "Unfollow": "Follow"}</button>
        <p>{warning}</p>
      </div>
    </div>
    </div>
  );
}
