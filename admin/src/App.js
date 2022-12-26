import Login from "./pages/login/Login";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Home from "./pages/home/Home";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import UserList from "./pages/userList/UserList";
import TagList from "./pages/tagList/TagList";
import CategoryList from "./pages/categoryList/CategoryList";
import PostList from "./pages/postList/PostList";
import MemberList from "./pages/memberList/MemberList";
import CommentList from "./pages/commentList/CommentList";
import ProfessorList from "./pages/professorList/ProfessorList";
import NewUser from "./pages/newUser/NewUser";
import UpdateUser from "./pages/updateUser/UpdateUser";
import React from "react";
function App() {
  
  var { admin } = useContext(Context);
  admin = {"username": "admin", "password": "123456"};
  return (
   
     <Router>
     <Switch>
       <Route path="/login">
         <Login />
       </Route>
       {admin && (
         <>
           <Topbar />
           <div className="container">
             <Sidebar />
             <Route exact path="/">
               <Home />
             </Route>
             <Route path="/users">
                <UserList />
              </Route>
              <Route path="/adduser">
                <NewUser />
              </Route>
              <Route path="/updateUser/:id">
                <UpdateUser />
              </Route>
              <Route path="/members">
                <MemberList />
              </Route>
              <Route path="/pros">
                <ProfessorList />
              </Route>
              <Route path="/posts">
                <PostList />
              </Route>
              <Route path="/comments">
                <CommentList />
              </Route>
              <Route path="/tags">
                <TagList />
              </Route>
              <Route path="/cats">
                <CategoryList />
              </Route>
           </div>
         </>
       )}
     </Switch>
   </Router>
  );
}

export default App;
