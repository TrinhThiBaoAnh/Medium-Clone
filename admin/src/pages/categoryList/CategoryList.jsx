import "./categoryList.css";
import { DataGrid } from "@material-ui/data-grid";
// import { Dacategoryrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useLocation } from "react-router";
export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    axios.get("/categories")
      .then(
        res => {
          // console.log(res.data);
          setCategories(res.data);
        }
      )
    };
  useEffect(()=>{
    getCategories();
  },[]);
  
  let numCategories = categories ? categories.length : -1;
  console.log('numcategories', numCategories);
  if (categories.length > 0) {
    console.log('categories>>>',categories); 
  }
  const [data, setData] = useState(categories);
  console.log('data>>>',data);

  // const handleDelete = (id) => {
  //   setData(categories.filter((item) => item.id !== id));
  // };
  
  const columns = [
    {field: '__check__', hide: true},
    { field: 'cat_id', headerName: "ID", flex:1},
    { field: 'cat_name', headerName: "Category name", flex:1},
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={"/cat/" + params.row.categoryId}>
    //           <button className="categoryListEdit">Edit</button>
    //         </Link>
    //         <DeleteOutline
    //           className="categoryListDelete"
    //           onClick={() => handleDelete(params.row.categoryId)}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];
  return (
    
    <div className="categoryList">
      <h2 className="catListTitle">CATEGORIES</h2>
      <br>
      </br>
      {numCategories > 0 && (<DataGrid
        rows={categories}
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
