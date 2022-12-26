import "./followings.css";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";

export default function Followings() {
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
  const handleUnfollow = async (i) => {
    console.log('id:', user._id, i);
    try{
        const res = await axios.put(`/users/${user._id}/unfollow`, {
          userId: i
        });
        console.log("res", res.data);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        
      } catch(e){ 
            dispatch({ type: "UPDATE_FAILURE"});
      }
  };
  let user_followings =[];
  for (var i = 0; i < user.followings.length; i++) {
    for (var j = 0; j < users.length; j++) {
        if (users[j].userId === user.followings[i]) {
            user_followings.push(users[j]);
        }
    }
  }
  console.log("user_followings", user_followings)
  return (
    <div className="Followings">
      <div className="FollowingsWrapper">
        <br></br>
        <br></br>
       <h2>Your Followings List:</h2>
       <br></br>
       <br></br>
       {user_followings.length > 0 && (
        <ul className="sidebarList-userHome">
        {user_followings.map((item) => (
        //   <Link to={`/?profile=${item._id}`} className="link">
          <li className="sidebarListItem-following">
            <div className="left-item">
                <img src={PF+ item.profilePic}></img>
            </div>
            <div className="right-item">
                <p>Username:{item.username}</p>
                <p>Email:{item.email}</p>
            </div>
            <div className="right-item2">
            <button className="unfollowSubmit" onClick={()=>handleUnfollow(item.userId)}>
                    Unfollow
            </button>
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
