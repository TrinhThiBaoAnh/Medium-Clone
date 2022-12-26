import React from "react";
import "./topbar.css";
import { NotificationsNone} from "@material-ui/icons";
import { useEffect, useState, useContext} from "react";
import { Context } from "../../context/Context";
// import Settings from "../settings/Settings";
export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Medium</span>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div> */}
          {/* <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div> */}
          <p>admin</p>
          <div className="topbarIconContainer">
            
          </div>
          <img src={PF + user.profilePic} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
