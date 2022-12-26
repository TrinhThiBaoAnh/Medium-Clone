import { CommentSection} from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import React from 'react';
import axios from "axios";
import { Context } from "../../context/Context";
import { useContext, useEffect, useInsertionEffect, useState } from "react";
import { useLocation } from "react-router";
export default function Comment({user, post}) {
    const PF = "http://localhost:5000/images/";
    // console.log(post._id);
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const defaultCmt =
    {
        avatarUrl: "",
        replies: [],
        comId: "",
        text: "",
        userProfile: "",
        userId: "",
        fullName: "",
        postId: "",
    }
    const [cmts, setCmts] = useState([defaultCmt]);
    useEffect(() => {
      const getCmts = async () => {
        
        const res = await axios.get("/comments/" + path);
        console.log('Test', path, res);
        if (res.status ===200){
          setCmts(res.data.map((item) => {
            return {...item, avatarUrl: PF + item.avatarUrl}
            })
          );
        }
      };
      getCmts();
    }, []);
    // console.log("cmt", cmts);
    const handleSubmit= async (data) => {
      try {
        await axios.post(`/comments/`, {
          avatarUrl: data.avatarUrl.replace(PF,""),
          replies: data.replies,
          comId: data.comId,
          text: data.text,
          userProfile: data.userProfile,
          userId: data.userId,
          fullName: data.fullName,
          postId: path,
        });
      } catch (err) {console.log(err);}
    }
    const handleDelete= async (data) => {
      console.log(data.repliedToCommentId);
      if (data.repliedToCommentId==null){
        try {
          await axios.delete(`/comments/${data.comIdToDelete}`);
        } catch (err) {console.log(err);}
      }
      else{

      }

    }
    const handleReply= async (data) => {
      try {
        const res = await axios.get(`/comments/?cmtId=${data.repliedToCommentId}`);
        let orgComment = res.data;
        console.log("orgComment",orgComment);
        console.log("data",data);
        const replyCmt =  {
          avatarUrl: data.avatarUrl,
          replies: data.replies,
          comId: data.comId,
          text: data.text,
          userProfile: user.userProfile,
          userId: data.userId,
          fullName: data.fullName,
          postId: path,
        };
        console.log("replyCmt",replyCmt);
        // console.log(typeof(orgComment.replies), orgComment.replies.length);
        orgComment.replies[orgComment.replies.length] = replyCmt;
        console.log(typeof(orgComment.replies), orgComment.replies);
        await axios.put(`/comments/${orgComment.comId}`, {
          avatarUrl: orgComment.avatarUrl,
          replies: orgComment.replies,
          comId: orgComment.comId,
          text: orgComment.text,
          userProfile: user.profilePic,
          userId: orgComment.userId,
          fullName: orgComment.fullName,
          postId: path,
        });
      } catch (err) {console.log(err);}
    }
    const handleEdit= async (data) => {
      try {
        await axios.put(`/comments/${data.comId}`, {
          avatarUrl: data.avatarUrl.replace(PF,""),
          replies: data.replies,
          comId: data.comId,
          text: data.text,
          userProfile: user.profilePic,
          userId: data.userId,
          fullName: data.fullName,
          postId: path,
        });
      } catch (err) {console.log(err);}
    }
    return (
      <CommentSection
        currentUser={{
          currentUserId: user._id,
          currentUserImg:
            PF + user.profilePic,
          currentUserProfile:
            'http://localhost:3000/profile/'+user.userId,
          currentUserFullName: user.username
        }}
        currentData={(data) => console.log("currentData", data)}
        commentData={cmts.length > 0 && cmts[0].comId !== "" ? cmts: null}
        onSubmitAction={handleSubmit}
        onDeleteAction={handleDelete}
        onReplyAction={handleReply}
        onEditAction={handleEdit}
      />
    )
}