import "./userList.css";
import { DataGrid} from "@material-ui/data-grid";
import Box from '@mui/material/Box';
// import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const PF = "http://localhost:5000/images/";
  let org_data =[];
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
  const handleDelete = async (e) => {
    console.log(e);
    if (window.confirm("Bạn chắc chắn muốn xoá tài khoản?"))
    {
      try {
        await axios.delete(`/users/${e}`, {
          data: { userId: e },
        });
        window.location.replace("/users");
        // dispatch({ type: "LOGOUT" });
      } catch (err) {}
    }
    else{

    }
  };
  let numUsers = users ? users.length : -1;
  const columns = [
    {field: '__check__', hide: true},
    { field: 'userId', headerClassName: 'super-app-theme--header', headerName: "ID", width: 100},
    {
      field: 'profilePic',
      headerClassName: 'super-app-theme--header',
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
    { field: 'password', headerClassName: 'super-app-theme--header', headerName: "Password", editable: true, flex:1 },
    { field: 'email', headerClassName: 'super-app-theme--header', editable: true, editable: true, headerName: "Email",flex:1 },
    { field: 'bio',  headerClassName: 'super-app-theme--header',editable: true, editable: true, headerName: "Bio",flex:1 },
    {
      field: "isMember",
      headerClassName: 'super-app-theme--header',
      headerName: "Member",
      width: 150,
      renderCell: (params) => {
        return (
          <>
          {params.row.isMember && ( <CheckIcon className="isMember-icon" />)}
          </>
        );
      },
    },
    {
      field: "isPro",
      headerClassName: 'super-app-theme--header',
      headerName: "Expert",
      width: 150,
      renderCell: (params) => {
        return (
          <>
          {params.row.isPro && ( <CheckIcon className="isPro-icon" />)}
          </>
        );
      },
    },
    {
      field: "action",
      headerClassName: 'super-app-theme--header',
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/updateUser/" + params.row.userId}>
              <button className="userListEdit">Edit</button>
            </Link>
            
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
           
          </>
        );
      },
    },
  ];



  return (
    
    <div className="userList">
      <h2 className="userListTitle">USERS</h2>
      <Link to="/adduser">
      <button class="buttonadd" >Add new +</button>
      </Link>
      <br>
      </br>
      <br>
      </br>
      {numUsers > 0 && (<Box
      sx={{
        height: 400,
        width: '100%',
        // '& .MuiDataGrid-cell': {
        //   bgcolor: (theme) =>
        //     theme.palette.mode === 'dark' ? '#376331' : 'rgb(217 243 190)',
        // },
        '& .super-app-theme--header': {
          backgroundColor: '#326ae4',
        },
        
      }}
    ><DataGrid
        rows={users}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        autoHeight = {true}
        rowHeight={50}
        headerHeight={40}
      /> </Box>)}
      
    </div>
  );
}
