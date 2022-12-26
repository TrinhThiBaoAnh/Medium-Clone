import React, { useState, useEffect,useContext } from "react";
// import { useContext, useState } from "react";
import Select from 'react-select';
import { Context } from "../../context/Context";
import Editor from "./Editor";
import MyEditor from "./MyEditor";
import "./write.css";
import axios from "axios";
export default function Write() {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editor, setEditor] = useState(null);
  // const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState();
  const [option1, setOption1] = useState([]);
  const [option2, setOption2] = useState([]);
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  // const handleOption = ()
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      let cat_names = res.data.map(opt => ({ label: opt.cat_name, value: opt.cat_name }));
      // console.log('cats:', cat_names);
      setCats(cat_names);
    };
    getCats();
  }, []);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const getTags = async () => {
      const res = await axios.get("/tags");
      let tag_names = res.data.map(opt => ({ label: opt.tag_name, value: opt.tag_name }));
      setTags(tag_names);
    };
    getTags();
  }, []);
  // console.log('tags', tags);
  // console.log('cats', cats);
  useEffect(() => {
    setEditorLoaded(true);
  }, []);
    const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Here', desc);
    const newPost = {
      authorId: user.userId,
      title: title,
      desc: editor,
      shortDesc: editor.substring(0,200),
      photo: "post/default.png",
      categories: option1,
      tags: option2
    };
    // console.log('newPost',newPost);
    if (file) {
      const data =new FormData();
      const filename = 'post/' + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/ ", data);
      } catch (err) {}
    }
    try {
      // console.log('response1');
      const res = await axios.post("/posts", newPost);
      // console.log('response2');
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="Write">
      <h2></h2>
      <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="optionClass">
          <div className="categories">
            <label>Categories:</label>
            <div className="select">
            <Select
              options={cats}
              isMulti
              onChange={opts => setOption1(opts.map(opt => opt.label))}
            />
            </div>
          </div>
          
          <div className="tags">
            <label>Tags:</label>
            <div className="select">
              <Select
              options={tags}
              isMulti
              onChange={opts => setOption2(opts.map(opt => opt.label))}
            />
            </div>
          </div>
        </div>
        <div className="writeFormGroup">
          <div className="editor">
          {/* <Editor
            name="description"
            onChange={(desc) => {
              setDesc(desc);
            }}
            editorLoaded={editorLoaded}
          /> */}
           <MyEditor
            handleChange={(data) => {
              setEditor(data);
            }}
            data={editor}
            
            />
          </div>
          {/* <div className="preview">
            <h4>Preview</h4>
            {JSON.stringify(desc)}
          </div> */}
        </div>
      </form>
    </div>
      
    </div>
  );
}
