import { useEffect, useState, useContext} from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import "./userHome.css";
import axios from "axios";
import { useLocation } from "react-router";
import Footer from "../../components/footer/Footer";
import React from "react";
const PF = "http://localhost:5000/images/"

export default function UserHome() {
  const { user, dispatch } = useContext(Context);
  // console.log('user:', user);
  const [posts, setPosts] = useState([]);
  const [cats, setCats] = useState([]);
  const [url, setUrl] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
      const getUsers = async () => {
        const res = await axios.get("/users");
        let pros=[];

        for (var i = 0; i < res.data.length;i++){
          if (res.data[i].isPro){
            pros.push(res.data[i]);
          }
        }
        if (pros.length >3) setUsers(pros.slice(0, 3));
        else setUsers(pros);
      };
      getUsers();
    }, []);
  console.log("user:", users);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      // alert(search);
        if (!search.includes('cat')){
          const res = await axios.get("/posts" + search);
          setPosts(res.data);
          if (res.data.length > 0)
          {
            let user_posts = []
            for (var i = 0; i < res.data.length;i++){
              for (var j = 0; j < user.interests.length;j++){
                for (var k = 0; k < res.data[i].categories.length;k++) {
                  if (res.data[i].categories[k] == user.interests[j]){
                        if (user_posts.indexOf(res.data[i])==-1)
                            user_posts.push(res.data[i]);
                        break;
                  }
                  } 
              }
            } 
            setPosts(user_posts);
        }
        }
        else{
          const res = await axios.get("/posts" + search);
          setPosts(res.data);
        }
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="userHome">
        <Posts posts={posts} />
        <div className="sidebar-userHome">
          <div className="sidebarItem-userHome">
          <span className="sidebarTitle-userHome">DISCOVER MORE OF WHAT MATTERS TO YOU 22</span>
          <ul className="sidebarList-userHome">
            {cats.map((c) => (
              <Link to={`/?cat=${c.cat_name}`} className="link">
              <li className="sidebarListItem-userHome" key={c.cat_id}>{c.cat_name}</li>
              </Link>
            ))}
          </ul>
          </div>
          <div className="sidebarItem-userHome">
          <span className="sidebarTitle-userHome">WHO TO FOLLOW</span>
          
          <ul className="sidebarList-userHome">
          {users.map((user) => (
                        <Link to={`/profile/${user.userId}`} className="link">
                            <li className="sidebarListItem-home">
                                <img src={PF + user.profilePic} alt="Avatar" class="avatar"></img>
                                <p>{user.username}</p>
                            </li>
                        </Link>
          ))}
          </ul>
          
          </div>
          <div className="sidebarItem-userHome">
          <span className="sidebarTitle-userHome">READING LIST</span>
          <p>Click the <i class="sidebarIcon-post1 fa fa-plus" aria-hidden="true"></i> on any story to easily add it to your reading list or a custom list that you can share.</p>
          </div>
          <div className="sidebarItem-userHome">
            <span className="sidebarTitle-userHome">FOLLOW US</span>
            <div className="sidebarSocial-userHome">
              <a href="https://www.facebook.com/"><i className="sidebarIcon-userHome fab fa-facebook-square"></i></a>
              <a href="https://www.twitter.com/"><i className="sidebarIcon-userHome fab fa-twitter-square"></i></a>
              <a href="https://www.pinterest.com/"><i className="sidebarIcon-userHome fab fa-pinterest-square"></i></a>
              <a href="https://www.instagram.com/"><i className="sidebarIcon-userHome fab fa-instagram-square"></i></a>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
     
    </>
  );
}
