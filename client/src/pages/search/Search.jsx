import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
// import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import "./search.css";
import axios from "axios";
import { useLocation } from "react-router";
import Footer from "../../components/footer/Footer";
import React from "react";


export default function Search() {
  const [posts, setPosts] = useState([]);
  const [cats, setCats] = useState([]);
  const [url, setUrl] = useState(useLocation());
//   const [result, setResult] = useState("");
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
 
//   const { search } = useLocation();
  // setSearch(e.target.value.toLowerCase())
  useEffect(() => {
    const fetchPosts = async () => {
      // alert(url);
    
      const res = await axios.get("/posts/?search=" + url);
      setPosts(res.data);
    //   setResult('Result:');
      
    };
    fetchPosts();
  }, [url]);
  return (
    <>
      <div className="search">
        <div className="sidebar-search">
        <div className="sidebarSearch-usersearch"> 
            <form className="searchForm1">
                <input
                type="text"
                placeholder="Entering..."
                onChange={(e) => {setUrl(e.target.value.toLowerCase())}}
                />
                <button className="searchSubmit1" type="submit">
                <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </form>
            </div>
            <br></br>
            <h2>Results:</h2>
            <Posts posts={posts} />
        </div>
      </div>
      <Footer/>
     
    </>
  );
}
