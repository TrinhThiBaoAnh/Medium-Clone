import "./postList.css";
import { DataGrid } from "@material-ui/data-grid";
// import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import { useLocation } from "react-router";
import { contents } from "cheerio/lib/api/traversing";
export default function PostList() {
  const PF = "http://localhost:5000/images/";
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

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

  const getPosts = () => {
    axios.get("/posts")
      .then(
        res => {
          // console.log(res.data);
          setPosts(res.data);
        }
      )
    };
  useEffect(()=>{
    getPosts();
  },[]);
  const [data, setData] = useState(posts);
  for (var i=0; i<posts.length;i++){
    for (var j=0; j<users.length;j++){
      if (posts[i].authorId===users[j].userId){
        org_data.push({...posts[i], 
                        author:users[j].username, 
                        numOfLikes: posts[i].likes.length,  
                      })
      }
    }
  }
  console.log("data: " , org_data);
  let numPosts = posts ? posts.length : -1;
  const handleDelete = (id) => {
    setData(org_data.filter((item) => item.postId !== id));
  };
  
  const columns = [
    {field: '__check__', hide: true},
    { field: 'postId', headerClassName: 'super-app-theme--header', headerName: "ID",flex: 1},
    { field: 'title', headerClassName: 'super-app-theme--header', editable: true, headerName: "Title",flex: 2},
    { field: 'author',  headerClassName: 'super-app-theme--header',headerName: "Author",flex: 1},
    { field: 'numOfLikes', headerClassName: 'super-app-theme--header', headerName: "Likes",flex: 1},
    { field: 'categories', headerClassName: 'super-app-theme--header', headerName: "Categories",flex: 1},
    { field: 'tags', headerClassName: 'super-app-theme--header', headerName: "Tags"},
    // {
    //   field: "action",
    //   headerName: "Action",
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <DeleteOutline
    //           className="postListDelete"
    //           onClick={() => handleDelete(params.row.postId)}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    
    <div className="postList" >
      <h2 className="postListTitle">POSTS</h2>
      <br>
      </br>
      {numPosts > 0 && (
      <Box
      sx={{
        height: 300,
        width: '100%',
        '& .cold': {
          backgroundColor: '#b9d5ff91',
          color: '#1a3e72',
        },
        '& .hot': {
          backgroundColor: '#ff943975',
          color: '#1a3e72',
        },
        '& .super-app-theme--header': {
          backgroundColor: 'rgba(255, 7, 0, 0.55)',
        },
        
      }}
      >
      <DataGrid
        rows={org_data}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        autoHeight = {true}
        autoWidth = {true}
        rowHeight={50}
        headerHeight={40}
        getCellClassName={(params) => {
          console.log(params);
          if (params.field == 'numOfLikes') {
            console.log(params.value);
            return params.value >= 3 ? 'hot' : 'cold';
          }
          return '';
        }}
      />
      </Box>)}
    </div>
  );
}
