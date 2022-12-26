import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Feedback from "./pages/feedback/Feedback";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Reading from "./pages/reading/Reading";
import Followers from "./pages/followers/Followers";
import Followings from "./pages/followings/Followings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Search from "./pages/search/Search";
import Profile from "./pages/profile/Profile";
import Plans from "./pages/plans/Plans";
import Membership from "./pages/membership/Membership";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import React from "react";
import UserHome from "./pages/userHome/UserHome";
import RecommendedPost from "./components/recommendedPost/RecommendedPost";
import Trending from "./pages/trending/Trending";
function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">{user ?<UserHome />:<Home/>}</Route>
        <Route path="/register">{user ? <UserHome /> : <Register />}</Route>
        <Route path="/login">{user ? <UserHome /> : <Login />}</Route>
        <Route path="/about">{<About />}</Route>
        <Route path="/membership">{<Membership />}</Route>
        <Route path="/search">{<Search />}</Route>
        <Route path="/feedback">{<Feedback />}</Route>
        <Route path="/write">{user ? <Write /> : <Register />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
        <Route path="/profile/:id">{user ? <Profile /> : <Register />}</Route>
        <Route path="/reading">{user ? <Reading /> : <Register />}</Route>
        <Route path="/followings">{user ? <Followings /> : <Register />}</Route>
        <Route path="/followers">{user ? <Followers /> : <Register />}</Route>
        <Route path="/post/:postId"><Single /></Route>
        <Route path="/trending"><Trending /></Route>
        <Route path="/plans"><Plans /></Route>
      </Switch>
    </Router>
    
  );
}

export default App;
