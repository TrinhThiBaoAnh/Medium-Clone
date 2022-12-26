import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Context } from "../../context/Context";
import "./topbar.css";
import React from "react";
export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
      // console.log(res.data);
    };
    getCats();
  }, []);
  // console.log(cats);
  // cats.map((c) => {
  //   console.log(c.cat_name);
  // });
  return (
    <div className="top">
      <div className="topLeft">
        {/* <a href="https://www.facebook.com" ><i className="topIcon fab fa-facebook-square"></i></a>
        <a href="https://www.twitter.com"><i className="topIcon fab fa-twitter-square"></i></a>
        <a href="https://www.pinterest.com"><i className="topIcon fab fa-pinterest-square"></i></a>
        <a href="https://www.instagram.com"><i className="topIcon fab fa-instagram-square"></i></a> */}
        <a><img className="logo" src="https://www.madelonsprengnether.com/new/wp-content/uploads/2018/03/1F6SrJR7_s95r6oCF3ugMZw.png"></img></a>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          {/* <li className="dropdown topListItem">
            <Link className="link" to="/">
              CATEGORIES
              <div class="dropdown-content">
                
                  {cats.map((c) => (
                       <Link to={`/?cat=${c.cat_name}`} className="link">
                          <p className="catsName" value={c}> {c.cat_name} </p>
                       </Link>
                    ))}
              </div>
              
            </Link>
          </li> */}
          <li className="topListItem">
            <Link className="link" to="/trending">
              TRENDING
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          {/* <li className="topListItem">
            <Link className="link" to="/feedback">
              FEEDBACK
            </Link>
          </li> */}
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/search">
              SEARCH
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight dropdown">
        {user ? (
          <Link to={`/profile/${user.userId}`}>
            <img className="topImg" src={PF+ user.profilePic} alt="" />
            <div class="dropdown-content2">
                  {/*                 
                  {options.map((opt) => (
                       <Link to={`${opt.value}`} className="link">
                          <p className="option" value={opt.value}> {opt.label} </p>
                       </Link>
                    ))} */}
                    <Link to={'/settings'} className="link">
                          <p className="option" value='/settings'> Settings </p>
                    </Link>
                    <Link to={'/reading'} className="link">
                          <p className="option" value='/reading'> Reading List </p>
                    </Link>
                    <Link to={'/followings'} className="link">
                          <p className="option" value='/followings'> Followings </p>
                    </Link>
                    <Link to={'/followers'} className="link">
                          <p className="option" value='/followers'> Followers </p>
                    </Link>
                    {user.isMember ? (<Link to={'/membership'} className="link">
                          <p className="option" value='/membership'> Unregister </p>
                    </Link>) : null}
              </div>
          </Link>
          
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
