import "./memberList.css";
import { DataGrid } from "@material-ui/data-grid";
// import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useLocation } from "react-router";
export default function MemberList() {
  const [users, setUsers] = useState([]);
  const PF = "http://localhost:5000/images/";
  
  const getUsers = () => {
    axios.get("/users")
      .then(
        res => {
          // console.log(res.data);
          setUsers(res.data);
        }
      )
    };
  useEffect(()=>{
    getUsers();
  },[]);
  let data = users.map(item=>{
    console.log(item);
    if(item.isMember)
        return item;
  })
  data = data.filter(function( element ) {
    return element !== undefined;
    });
  let numUsers = data ? data.length : -1;
  const columns = [
    {field: '__check__', hide: true},
    { field: 'userId', headerName: "ID", width: 100},
    {
      field: 'profilePic',
      headerName: "User",
     flex:1,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={PF+ params.row.profilePic} alt="" />
            {params.row.username}
          </div>
        );
      }, 
    },
    { field: 'password', headerName: "Password",flex:1 },
    { field: 'email', editable: true, headerName: "Email",flex:1 },
    { field: 'bio', editable: true, headerName: "Bio",flex:1 },
  ];



  return (
    
    <div className="memberList">
      <h2 className="memberListTitle">MEMBERS</h2>
      <br>
      </br>
      {numUsers > 0 && (<DataGrid
        rows={data}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        autoHeight = {true}
        rowHeight={50}
        headerHeight={40}
       
      />)}
      
    </div>
  );
}
