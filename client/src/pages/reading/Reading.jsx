import "./reading.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import RecommendedPosts from "../../components/recommendedPosts/RecommendedPosts";
import React from "react";

export default function Reading() {
  const { user, dispatch } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const readingList = user.readingList;
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  let user_posts =[];
  // let c = 0;
  for (var i = 0; i < readingList.length; i++) {
    for (var j = 0; j < posts.length; j++) {
        // console.log(posts[j]._id);
        if (posts[j]._id === readingList[i]) {
            user_posts.push(posts[j]);
            
        }
    }
  }
//   console.log(c);
  return (
    <div className="reading">
      <div className="readingWrapper">
        <br></br>
        <br></br>
       <h2>Your Reading List:</h2>
       <RecommendedPosts recommendedPosts={user_posts}/>
      </div>
    </div>
  );
}
