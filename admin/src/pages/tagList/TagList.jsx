import "./tagList.css";
import { DataGrid } from "@material-ui/data-grid";
// import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useLocation } from "react-router";
export default function TagList() {
  const [tags, setTags] = useState([]);
  const getTags = () => {
    axios.get("/tags")
      .then(
        res => {
          // console.log(res.data);
          setTags(res.data);
        }
      )
    };
  useEffect(()=>{
    getTags();
  },[]);
  
  let numTags = tags ? tags.length : -1;
  // console.log('numtags', numTags);
  if (tags.length > 0) {
    console.log('tags>>>',tags); 
  }
  const [data, setData] = useState(tags);
  console.log('data>>>',data);

  const handleDelete = (id) => {
    setData(tags.filter((item) => item.tag_id !== id));
  };
  
  const columns = [
    {field: '__check__', hide: true},
    { field: 'tag_id', headerName: "ID", flex: 1},
    { field: 'tag_name', headerName: "ID",flex: 1},
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <DeleteOutline
    //           className="tagListDelete"
    //           onClick={() => handleDelete(params.row.tagId)}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];
  return (
    <div className="tagList">
      <h2 className="tagListTitle">TAGS</h2>
      <br>
      </br>
      {numTags > 0 && (<DataGrid
        rows={tags}
        getRowId={(row) => row.tag_id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        autoHeight = {true}
        rowHeight={50}
        headerHeight={40}
        // getCellClassName={(params) => {
        //   console.log(params);
        //   if (params.field == '__check__'){
        //     params.colDef.hide = true;
        //     return '';
        //   }
        // }}
      />)}
      
    </div>
  );
}
