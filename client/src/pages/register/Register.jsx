import axios from "axios";
import { Link } from "react-router-dom";
import "./register.css";

import {useEffect, useState } from "react";
import React from "react";
import Select from 'react-select';
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [cats, setCats] = useState([]);
  const [interests, setInterests] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      let cat_names = res.data.map(opt => ({ label: opt.cat_name, value: opt.cat_name }));
      // console.log('cats:', cat_names);
      setCats(cat_names);
    };
    getCats();
  }, []);
  // const handleInterests = async (id) =>{
  //     // interests = [...interests, id];
  //     console.log('interests', interests);
  //     const index = interests.indexOf(id);
  //     if (index > -1){
  //         interests.splice(index, 1);
  //     }
  //     else{
  //       interests[interests.length] = id
  //     }
     
  //     setInterests(interests);
  //     console.log('interests', interests);
  //     // console.log('id', id);
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    // alert(interests);
    try {
      
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
        interests
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <div className="infor">
          <label>Username</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your username..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            className="registerInput"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            className="registerInput"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="registerButton" type="submit">
          Register
          </button>
        </div>
        <div className="categoryList">
        <label>Interests:</label>
        <div className="select">
            <Select
              options={cats}
              isMulti
              onChange={opts => setInterests(opts.map(opt => opt.value))}
            />
            </div>
        </div>
        
       
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}
