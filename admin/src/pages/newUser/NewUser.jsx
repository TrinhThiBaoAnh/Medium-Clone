import "./newUser.css";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import React from "react";
// import Select from 'react-select';
export default function NewUsers() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [password, setPassword] = useState(user.password);
  const [success, setSuccess] = useState(false);
  const PF = "http://localhost:5000/images/"
  const options = user.interests.map(opt => ({ label: opt, value: opt}));
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError(false);
    // alert(interests);
    console.log( {
      username,
      email,
      password,
      bio
    });
    try {
      
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
        bio
      });
      setSuccess(true);
      res.data && window.location.replace("/users");
    } catch (err) {
      // setError(true);
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Create New Account</span>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been created...
            </span>
            // alert("Profile has been successfully updated")
          )}
          {/* <span className="settingsDeleteTitle" onClick={handleDelete}>Delete Account</span> */}
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <div className="update-info">
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img
                src={file ? URL.createObjectURL(file) : PF+ user.profilePic}
                alt=""
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label>Username</label>
            <input
              type="text"
              placeholder={"Please enter new username"}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder={"Please enter new email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder={"Please enter new password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Bio</label>
            <textarea
              className="bio"
              type="text"
              onChange={(e) => setBio(e.target.value)}
            />
           
          </div> 
          <button className="settingsSubmit" type="submit">
              Create
          </button>
          
        </form>
      </div>
    </div>
  );
}
