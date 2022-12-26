import "./updateUser.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import React from "react";
import { useLocation } from "react-router";
export default function UpdateUser() {
  const { user, dispatch } = useContext(Context);
  const location = useLocation();
  const user1ID = location.pathname.split("/")[2];
  const [user1, setUser1] = useState(user);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [password, setPassword] = useState(user.password);
  const [expert, setExpert] = useState(user.isPro);
  const [success, setSuccess] = useState(false);
  const PF = "http://localhost:5000/images/"
  useEffect(() => {
    const getUser1 = async () => {
      const res = await axios.get("/users/" + user1ID);
      setUser1(res.data);
    };
    getUser1();
  }, []);
  // console.log('user1', user1);
  const handleSubmit = async (e) => {
    // console.log(e);
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    if (username == "" || email== "" ||  password== "")
    {
      alert("Please fulfill the form!");
    }
    //  isPro: expert,
    else{
      const updatedUser = {
        id: user1._id,
        username,
        email,
        password,
        bio,
       
      };
      if (file) {
        const data = new FormData();
        let filename = file.name;
        filename = "avatar/" + filename;
        data.append("name", filename);
        data.append("file", file);
        updatedUser.profilePic = filename;
        try {
          await axios.post("/upload", data);
        } catch (err) {}
      }
      try {
        console.log(updatedUser);
        const res = await axios.put("/users/" + user1._id, updatedUser);
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        res.data && window.location.replace("/users");
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
      }
    }
    
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
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
                src={file ? URL.createObjectURL(file) : PF+ "avatar/default0.jpg"}
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
              defaultValue=""
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              defaultValue=""
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              defaultValue={user1.password}
              placeholder={"Please enter new password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Bio</label>
            <textarea
              className="bio"
              type="text"
              defaultValue=""
              onChange={(e) => setBio(e.target.value)}
            />
            {/* <label>isExpert</label>
            <input
              type="checkbox"
              defaultValue={user1.isPro}
              placeholder={"Please enter new password"}
              onChange={(e) => {console.log(e);setExpert(!expert)}}
            /> */}
          </div>
          <button className="settingsSubmit" type="submit">
              Update
          </button>
         
        </form>
      </div>
    </div>
  );
}
