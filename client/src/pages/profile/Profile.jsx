import "./profile.css";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useLocation } from "react-router";
import React from "react";
export default function Profile() {
  
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"
  const location = useLocation();
  const authorId = location.pathname.split("/")[2];
  console.log(authorId);
  // const authorId = 2;
  const [author, setAuthor] = useState(user);
  useEffect(() => {
    const getAuthor = async () => {
      const res = await axios.get("/users/" + authorId);
      setAuthor(res.data);
    };
    getAuthor();
  }, []);
  console.log('author', author);
  return (
    <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={PF + 'post/default.png'}
                alt=""
              />
              <img
                className="profileUserImg"
                src={PF + author.profilePic}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">
                    {author.username}
                    {author.isPro ? 
                    <i className="vip-icon fa fa-check-circle" aria-hidden="true"></i>
                    : <p></p>
                    }</h4> 
            </div>
            <div className="profileInfoDesc">
                  <h2>Biography</h2>
                  <p>{author.bio}</p>
                  
                  
            </div>
          </div>
        </div>
        
    </div>
  );
}
