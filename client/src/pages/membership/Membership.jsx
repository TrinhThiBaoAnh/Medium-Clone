import "./membership.css";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useLocation } from "react-router";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
export default function Membership() {
    const { user, dispatch } = useContext(Context);
    const [check,setCheck] = useState(false);
    // const [ date, setDate] = useState(new Date());
    const PF = "http://localhost:5000/images/"
    const updateMember = async (e) => {
        const updatedMember = {
            end_date: Date.now(),
        };
        try {
            const res = await axios.put("/members/" + user._id, updatedMember);
            setCheck(true);
        } catch (err) {

        }
        
    };
    const [members,setMembers] = useState([]);
  // const [editor, setEditor] = useState(post.desc);
  useEffect(() => {
    const getMembers = async () => {
      const res = await axios.get("/members");
      setMembers(res.data);
    };
    getMembers();
  }, []);
  let myDate = new Date();
  console.log(myDate);
  console.log(members);
  for (var i= 0;i<members.length;i++) {
    if( user._id === members[i].user_id){
        myDate = members[i].end_date;
        console.log(myDate);
    }
  }
    const updateUser = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        // console.log('user',user);
        const updatedUser = {
            id: user._id,
            isMember: false,
        };
        try {
            const res = await axios.put("/users/" + user._id, updatedUser);
            console.log('update:', res.data);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };
    
  return (
   <div className="container-membership">
    <div className="img-membership">
        <img src="data:image/png;base64,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"></img>
    </div>
    <div className="header-membership">
        <h2>Get unlimited access to everything on Medium</h2>
        <p>Membership starting at less than 1 $/week. Cancel anytime.</p>
        <ul>
            <li><i className="fa fa-check-square-o" aria-hidden="true"></i>No ads</li>
            <li><i className="fa fa-check-square-o" aria-hidden="true"></i>Support quality writing</li>
            <li><i className="fa fa-check-square-o" aria-hidden="true"></i>Access on any device</li>
        </ul>
        <div>
        <br></br>
        <br></br>
        <p>Your expired date is: {myDate.toString()}</p>
        <button class="button button3" 
                onClick={(e) => {
                                    let tmp = window.confirm("Are you sure to unregister membership?");
                                    if (tmp){
                                        updateUser(e);
                                        updateMember(e);
                                        // deleteMember(e);
                                    }
                                }
                        }>
                                Unregister
        </button>
        {(check ? (
                                        <div>
                                            <span style={{color: "green"}}> Unregister Successfully !</span>
                                        </div>
                                    ): null)}
        {/* <button class="button" 
                                onClick={
                                    (e)=>{
                                        let tmp = confirm("Are you sure to unregister membership?");
                                        if (tmp){
                                         updateUser2(e);
                                        }
                                }}
                                >Update your membership
                    </button> */}
        </div>
    </div>
   
   </div>
  );
}
