import "./commentList.css";
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
export default function CommentList() {
  const PF = "http://localhost:5000/images/";
  const [comments, setComments] = useState([]);

  const getComments = () => {
    axios.get("/comments")
      .then(
        res => {
          // console.log(res.data);
          setComments(res.data);
        }
      )
    };
  useEffect(()=>{
    getComments();
  },[]);
  const [data, setData] = useState(comments);
//   for (var i=0; i<comments.length;i++){
//     for (var j=0; j<users.length;j++){
//       if (comments[i].authorId===users[j].userId){
//         org_data.push({...comments[i], 
//                         author:users[j].username, 
//                         numOfLikes: comments[i].likes.length,  
//                       })
//       }
//     }
//   }
  console.log("data: " , comments);
  let numComments = comments ? comments.length : -1;
  const handleDelete = (id) => {
    setData(comments.filter((item) => item.commentId !== id));
  };
  
  const columns = [
    {field: '__check__', hide: true},
    { field: 'comId', headerName: "ID",flex: 1},
    { field: 'text', editable: true, headerName: "Content",flex: 2},
    { field: 'fullName', headerName: "User",flex: 1},
    { field: 'postId', headerName: "Post ID",flex: 1},
    // {
    //   field: "action",
    //   headerName: "Action",
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <DeleteOutline
    //           className="commentListDelete"
    //           onClick={() => handleDelete(params.row.commentId)}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    <div className="commentList" >
      <h2 className="commentListTitle">POSTS</h2>
      <br>
      </br>
      {numComments > 0 && (
      <DataGrid
        rows={comments}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        autoHeight = {true}
        autoWidth = {true}
        rowHeight={50}
        headerHeight={40}
      />
    )};
  </div>
  );
}
