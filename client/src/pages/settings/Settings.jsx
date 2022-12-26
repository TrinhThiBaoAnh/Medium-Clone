import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import React from "react";
import Select from 'react-select';
export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [password, setPassword] = useState(user.password);
  const [success, setSuccess] = useState(false);
  const PF = "http://localhost:5000/images/"
  const [cats, setCats] = useState([]);
  const [interests, setInterests] = useState(user.interests);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      let cat_names = res.data.map(opt => ({ label: opt.cat_name, value: opt.cat_name }));
      setCats(cat_names);
    };
    getCats();
  }, []);

  // const handleInterests = async (id) =>{
  //     // interests = [...interests, id];
  //     console.log('interests', interests);
  //     let check = true;
  //     for (var idx=0;idx <interests.length; idx++){
  //       if (interests[idx] == id){
  //         check = false;
  //         break;
  //       }
  //     }
  //     if (check){
  //       interests[interests.length] = id
  //       setInterests(interests);
  //     }
  // }
  const options = user.interests.map(opt => ({ label: opt, value: opt}));
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    if (username == "" || email== "" ||  password== "")
    {
      alert("Please fulfill the form!");
    }
    else{
      const updatedUser = {
        id: user._id,
        username,
        email,
        password,
        bio,
        interests
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
        const res = await axios.put("/users/" + user._id, updatedUser);
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
      }
    }
    
  };
  const handleDelete = async (e) => {
    console.log(e);
    if (window.confirm("Bạn chắc chắn muốn xoá tài khoản?"))
    {
      try {
        await axios.delete(`/users/${e}`, {
          data: { userId: e },
        });
        window.location.replace("/");
        dispatch({ type: "LOGOUT" });
      } catch (err) {}
    }
    else{

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
          <span className="settingsDeleteTitle" onClick={handleDelete}>Delete Account</span>
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
              defaultValue={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              defaultValue={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              defaultValue={user.password}
              placeholder={"Please enter new password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Bio</label>
            <textarea
              className="bio"
              type="text"
              defaultValue={user.bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <label>Interests:</label>
            <div className="select">
              <Select
                options={cats}
                isMulti
                onChange={opts => setInterests(opts.map(opt => opt.value))}
                defaultValue={options}
              />
              </div>
          </div>
          <button className="settingsSubmit" type="submit">
              Update
          </button>
         
        </form>
      </div>
    </div>
  );
}
