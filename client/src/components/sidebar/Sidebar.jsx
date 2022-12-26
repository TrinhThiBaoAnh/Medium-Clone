// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import "./sidebar.css";
import React from "react";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT AUTHOR</span>
        <img
          src="https://i.pinimg.com/236x/1e/3f/58/1e3f587572a7a7b20bbf1828595a1786--holiday-party-themes-holiday-gift-guide.jpg"
          alt=""
        />
        <span className="authorName">Anh Văn Ace</span>
        <span className="authorFollowers">50K Followers</span>
        
      </div>
      <div className="div-follow">
        <button type="submit" className="btn-follow">Follow!</button>
      </div>
   
    </div>
  );
}
