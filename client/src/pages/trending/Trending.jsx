import Post from "../../components/post/Post";
import "./trending.css";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useLocation } from "react-router";
export default function Trending() {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  let new_posts = posts.sort((a,b) =>  b.likes.length - a.likes.length );
  return (
    <div className="posts">
      {new_posts.slice(0, 3).map((p) => (
        <Post post={p} />
      ))}
    </div>
  );
}
