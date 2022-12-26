import "./sidebar.css";
import React from "react";
import {
  Timeline,
  PermIdentity,
} from "@material-ui/icons";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import GroupsIcon from '@mui/icons-material/Groups';
import HailIcon from '@mui/icons-material/Hail';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CategoryIcon from '@mui/icons-material/Category';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";
export default function Sidebar() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
          <Link to="/" className="link">
            <li className="sidebarListItem active">
              <Timeline  className="sidebarIcon" />
              Dashboard
            </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/members" className="link">
              <li className="sidebarListItem">
                <GroupsIcon className="sidebarIcon" />
                Members
              </li>
            </Link>
            <Link to="/pros" className="link">
              <li className="sidebarListItem">
                <HailIcon className="sidebarIcon" />
                Experts
              </li>
            </Link>
            <Link to="/posts" className="link">
              <li className="sidebarListItem">
                <HistoryEduIcon className="sidebarIcon" />
                Posts
              </li>
            </Link>
            <Link to="/comments" className="link">
              <li className="sidebarListItem">
                <BorderColorIcon className="sidebarIcon" />
                Comments
              </li>
            </Link>
            <Link to="/tags" className="link">
              <li className="sidebarListItem">
                <LocalOfferIcon className="sidebarIcon" />
                Tags
              </li>
            </Link>
            <Link to="/cats" className="link">
              <li className="sidebarListItem">
                <CategoryIcon className="sidebarIcon" />
                Categories
              </li>
            </Link>
            <Link to="/login" className="link" onClick={handleLogout}>
              <li className="sidebarListItem">
                <LogoutIcon className="sidebarIcon" />
                Logout
              </li>
            </Link>
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
