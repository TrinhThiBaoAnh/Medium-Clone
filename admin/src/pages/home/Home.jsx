import Chart from '../../components/barChart/Chart';
import Chart2 from "../../components/pieChart/Chart2";
import areaChart from "../../components/areaChart/areaChart";
import "./home.css";
import React from "react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import { DataGrid } from "@material-ui/data-grid";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
export default function Home() {
  const PF = "http://localhost:5000/images/";
  let numMembers = 0;
  let numLikes = 0;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("/users");
      setUsers(res.data);
    };
    getUsers();
  }, []);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const getMembers = async () => {
      const res = await axios.get("/members");
      setMembers(res.data);
    };
    getMembers();
  }, []);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get("/posts");
      setPosts(res.data);
    };
    getPosts();
  }, []);
  const [year,setYear] = useState(2022);
  // const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   const getCategories = async () => {
  //     const res = await axios.get("/categories");
  //     setCategories(res.data);
  //   };
  //   getCategories();
  // }, []);
  let numUsers = users ? users.length : -1;
  let numPosts = posts ? posts.length : -1;
  // let numCategories = categories ? categories.length : -1;
  for (var i=0;i<numPosts;i++){
    numLikes = numLikes + posts[i].likes.length;
   }
  let countCatOnPosts = {};
  let countTagOnPosts = {};
  let categoriesList = [];
  let tagsList = [];
  let data =[];
  function countFreq(arr, n, isCat)
  {
      let res = [];
      let visited = Array.from({length: n}, (_, i) => false);
      for (let i = 0; i < n; i++) {

          if (visited[i] == true)
              continue;
     
          // Count frequency
          let count = 1;
          for (let j = i + 1; j < n; j++) {
              if (arr[i] == arr[j]) {
                  visited[j] = true;
                  count++;
              }
          }
          if (isCat)
            res.push({cat: arr[i], count: count});
          else
            res.push({tag: arr[i], count: count});
            //  document.write(arr[i] + " " + count + "<br/>");
      }
      return res;
  }
  for (var j = 0;j < numPosts;j++){
        categoriesList = categoriesList.concat(posts[j].categories);
        tagsList = tagsList.concat(posts[j].tags);
      }
  let isCat =true;
  let data2 = countFreq(categoriesList,categoriesList.length, isCat=true);
  let data3 = countFreq(tagsList,tagsList.length, isCat=false);
  const MONTHS ={
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  }
  for (var k=0;k<12;k++){
    data.push({month: MONTHS[k], users: 0, members: 0});
  }
  // console.log(data);
  // let currentTime = Date.now().getMonth;
  let countUsersPerMonth = {};
  let countMembersPerMonth = {};
  for (var i= 0; i < numUsers;i++){
    let tmp =  new Date(users[i].createdAt);
    // console.log('tmp', tmp.getMonth());
    if (tmp.getFullYear()===year){
      countUsersPerMonth[MONTHS[tmp.getMonth()]] = 
      countUsersPerMonth[MONTHS[tmp.getMonth()]] ? countUsersPerMonth[MONTHS[tmp.getMonth()]] + 1 : 1;
    if (users[i].isMember){
      countMembersPerMonth[MONTHS[tmp.getMonth()]] = 
      countMembersPerMonth[MONTHS[tmp.getMonth()]] ? countMembersPerMonth[MONTHS[tmp.getMonth()]] + 1 : 1;
    }
    }
  }
  const years = [
    {label: '2021', value: 2021},
    {label: '2022', value: 2022},
    {label: '2023', value: 2023},
  ]
  
  for (const [key, value] of Object.entries(countUsersPerMonth)) {
      let objIndex = data.findIndex((obj => obj.month == key));
      if (objIndex > 0) 
          data[objIndex].users = value;
  }
  for (const [key, value] of Object.entries(countMembersPerMonth)) {
    let objIndex = data.findIndex((obj => obj.month == key));
    if (objIndex > 0)  data[objIndex].members = value;
  }
  let count1= 0;
  let count2 = 0;
  for (var i=0;i< members.length;i++){
      if (members[i].fee==5) count1++; else count2++;
  }
  let data4=[
    {
      fee: 5,
      count: count1
    },
    {
      fee: 50,
      count: count2
    }
  ];
  const columns1 = [
    {field: '__check__', hide: true},
    { field: 'cat', headerName: "Categories",flex:1},
    { field: 'count', headerName: "Frequences",flex:1 },
  ];
  const columns2 = [
    {field: '__check__', hide: true},
    { field: 'tag', headerName: "Tags",flex:1},
    { field: 'count', headerName: "Frequences",flex:1 },
  ];
  return (
    <div className="home">
      <h2 className="homeListTitle">DASHBOARD</h2>
      <br>
      </br>
      <div className="header-home">
      <div class="flex-container">
          <div class="flex-user"><PeopleAltIcon className="icon-home"/><p>Total Users:{numUsers}</p></div>
          <div class="flex-post"><ReceiptLongIcon className="icon-home"/><p>Total Posts:{numPosts}</p></div>
          <div class="flex-like"><ThumbUpIcon className="icon-home"/> <p>Total likes:{numLikes}</p></div>
          <div class="flex-member"><PersonIcon className="icon-home"/><p>Total members:{members.length}</p></div>    
        </div>
       
      </div>
      <div className='body-home'>
      <div className="dropdown topListItem">
       <h4> Select year: {year}</h4>
        <div class="dropdown-content">    
        {years.map((c) => (
            <p  className="catsName" 
                value={c.value} 
                onClick={(e)=> {console.log(c.value);setYear(c.value);}}>
               {c.label}
            </p>
        ))}
        </div>
      </div>
    
      <div className="chart-1">
      <Chart title={"Number of new users and members per month" } 
              data={data} 
              dataKey1="users"
              dataKey2="members"
      />
      </div>
      <div className='list23'>
      <div className='list3'>
        {data3.length > 0 && (<DataGrid
                            rows={data3}
                            getRowId={(row) => row.tag}
                            disableSelectionOnClick
                            columns={columns2}
                            pageSize={5}
                            checkboxSelection
                            autoHeight = {true}
                            rowHeight={50}
                            headerHeight={40}
                            />)
          }
      </div>
      <div className='chart3'>
        <Chart2 title={"The proportion of total posts each tags:" }
              data={data3}
              dataKey="count"
        />
      </div>
      </div>
      <div class="flex-container">
          <div className='flex-members'>
          <div class="flex-revenue">
              <div className='flex-revenue1'>
              <ReceiptLongIcon className="icon-home"/>
              <p>Total Revenue:<h2>${count1*5+count2*50} </h2></p>
              </div>
              <div className='flex-revenue2'>
              <PeopleAltIcon className="icon-home"/>
              <p>Total Member:<h2>{count1 + count2}</h2></p>
              </div>
          </div>
          <div class="flex-member1">
              
              <div class="flex-member11">
                  Monthly ($5)
                  <h2>{count1}</h2>
              </div>
              <div class="flex-member12">
                  Yearly ($50)
                  <h2>{count2}</h2>
              </div>
          </div>  
          </div>
          <div className='chart-members'>
            <Chart2 title={"The proportion of total posts each categories:" }
              data={data4}
              dataKey="count"
            />
          </div>
        </div>
      
      <div  className='chart23'>
      <div className='chart2'>
        <Chart2 title={"The proportion of total posts each categories:" }
              data={data2}
              dataKey="count"
        />
      </div>
      <div className='list2'>
      {data2.length > 0 && (<DataGrid
                          rows={data2}
                          getRowId={(row) => row.cat}
                          disableSelectionOnClick
                          columns={columns1}
                          pageSize={5}
                          checkboxSelection
                          autoHeight = {true}
                          rowHeight={50}
                          headerHeight={40}
                          />)
        }
      </div>
      
      </div>
      </div>
      <div className='footer-home'>
        <p>Medium- Discover the world</p>
      </div>
    </div>
    
  );
}
