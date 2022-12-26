import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
// import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";
import Footer from "../../components/footer/Footer";
import React from "react";


export default function Home() {
  const [posts, setPosts] = useState([]);
  const [cats, setCats] = useState([]);
  const [url, setUrl] = useState(null);
  
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
 
  const { search } = useLocation();
  // setSearch(e.target.value.toLowerCase())
  useEffect(() => {
    const fetchPosts = async () => {
      // alert(url);
      if (url==null) {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
      }
      else{
        const res = await axios.get("/posts" + url);
        setPosts(res.data);
        setUrl(null);
      }
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <div className="sidebar-home">
          <div className="sidebarItem-home">
          <span className="sidebarTitle-home">DISCOVER MORE OF WHAT MATTERS TO YOU</span>
          <ul className="sidebarList-home">
            {cats.map((c) => (
              <Link to={`/?cat=${c.cat_name}`} className="link">
              <li className="sidebarListItem-home" key={c.cat_name}>{c.cat_name}</li>
              </Link>
            ))}
          </ul>
          </div>
          <div className="sidebarItem-home">
          <span className="sidebarTitle-home">ACHIEVES</span>
          <ul className="sidebarList-home">
          </ul>
          </div>
          <div className="sidebarItem-home">
            <span className="sidebarTitle-home">FOLLOW US</span>
            <div className="sidebarSocial-home">
              <a href="https://www.facebook.com/"><i className="sidebarIcon-home fab fa-facebook-square"></i></a>
              <a href="https://www.twitter.com/"><i className="sidebarIcon-home fab fa-twitter-square"></i></a>
              <a href="https://www.pinterest.com/"><i className="sidebarIcon-home fab fa-pinterest-square"></i></a>
              <a href="https://www.instagram.com/"><i className="sidebarIcon-home fab fa-instagram-square"></i></a>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
     
    </>
  );
}
