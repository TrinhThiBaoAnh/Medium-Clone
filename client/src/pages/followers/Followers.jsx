import "./followers.css";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";

export default function Followers() {
  const PF = "http://localhost:5000/images/";
  const { user, dispatch } = useContext(Context);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("/users/");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);
  let user_followers =[];
  for (var i = 0; i < user.followers.length; i++) {
    for (var j = 0; j < users.length; j++) {
        if (users[j].userId === user.followers[i]) {
            user_followers.push(users[j]);
        }
    }
  }
//   console.log("user_followers", user_followers)
  return (
    <div className="Followers">
      <div className="FollowersWrapper">
        <br></br>
        <br></br>
       <h2>Your Followers List:</h2>
       <br></br>
       <br></br>
       {user_followers.length > 0 && (
        <ul className="sidebarList-userHome">
        {user_followers.map((item) => (
        //   <Link to={`/?profile=${item._id}`} className="link">
          <li className="sidebarListItem-follower">
            <div className="left-item">
                <img src={PF+ item.profilePic}></img>
            </div>
            <div className="right-item">
                <p>Username:{item.username}</p>
                <p>Email:{item.email}</p>
            </div>
            <div className="right-item2">
            </div>
          </li>
        //   </Link>
        ))}
        </ul>
       )}
      </div>
    </div>
  );
}
