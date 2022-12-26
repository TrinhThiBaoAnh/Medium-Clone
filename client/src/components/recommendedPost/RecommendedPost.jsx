import "./recommendedPost.css";
import { Link } from "react-router-dom";
import React from "react";
export default function RecommendedPost({ recommendedPost }) {
  const PF = "http://localhost:5000/images/";
  let timeToRead = "1 min read";
  if (recommendedPost.desc.length < 1000){
    timeToRead = "2 min read";
  }
  else if (recommendedPost.desc.length < 3000){
    timeToRead = "5 min read";
  }
  else if (recommendedPost.desc.length < 5000){
    timeToRead = "7 min read";
  }
  else if (recommendedPost.desc.length > 5000){
    timeToRead = "10 min read";
  }
  return (
    <div className="recommendedPost">
        <div className="recommendedPost-img">
            {recommendedPost.photo && <img className="recommendedPostImg" src={PF + recommendedPost.photo} alt="" />}
        </div>
        <div className="recommendedPostInfo">
            <div className="recommendedPostCats">
            {recommendedPost.categories.map((c) => (
                <span className="recommendedPostCat">{c.name}</span>
            ))}
            </div>
            <a href={`/post/${recommendedPost._id}`} className="link">
            <span className="recommendedPostTitle">{recommendedPost.title}</span>
            </a>
            <br></br>
            <span className="recommendedPostDate">
            {new Date(recommendedPost.createdAt).toDateString()} .
            <p className="recommendedPostTime">{timeToRead}</p>
            </span>
            
            <p className="recommendedPostDesc" dangerouslySetInnerHTML={{__html: recommendedPost.desc}}>{}</p>
            
        </div>
        
    </div>
  );
}
