import React, { useState } from "react";
import "./style.css";
import { data } from "../../data/data";

// TESTING
const initialValue = {
  postid: "as6d5421",
  voteCount: 0,
  image: "",
  userid: "asd564654",
  title: "first post",
  comments: [],
};

function CreatePost() {
  const [caption, setcaption] = useState("");

  const handleCaptionChange = (e) => {
    setcaption(e.target.value);
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    const newPost = { ...initialValue, title: caption };
    const updatePosts = [...data, newPost];
  };

  return (
    <form className="border-black flex p-2 justify-evenly gap-5 bg-slate-400 rounded-xl">
      <input
        type="text"
        name=""
        id=""
        value={caption}
        onChange={(e) => handleCaptionChange(e)}
        className=" w-full rounded-md p-1 px-2"
      />
      <input
        type="file"
        name=""
        id=""
        title=" "
        className="custom-file-input"
      />
      <button
        className=" border-black px-3 bg-white rounded-md"
        onClick={(e) => handleSubmitPost(e)}
      >
        Post
      </button>
    </form>
  );
}

export default CreatePost;