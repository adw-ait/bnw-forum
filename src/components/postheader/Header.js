import React, { useState, useContext } from "react";
import { AppContext } from "../../App";

function Header(props) {
  const { post } = props;
  const { addComment } = useContext(AppContext);
  const [commentText, setcommentText] = useState("");

  const sendComment = () => {
    const data = { commentText, id: post.id, comments: post.comments };
    setcommentText("");
    addComment(data);
  };
  return (
    <>
      <div className="postheader flex flex-row pb-3">
        <span className="image">
          <img src={post.imageUrl} alt="" />
        </span>
        <div className="caption flex flex-col p-4">
          <div className="userid">
            {">>"}Anonymous (ID :{" "}
            <span className="text-red-500">{post.authorId}</span>) &nbsp;
            {/* <span className="timestamp text-xs">2hr ago</span> */}
          </div>

          <span className="title">{post.title}</span>
          <span className="reply flex gap-5">
            <input
              type="text"
              className="border border-black"
              value={commentText}
              onChange={(e) => setcommentText(e.target.value)}
            />
            <button
              className="border border-black p-1"
              onClick={() => sendComment()}
            >
              reply
            </button>
          </span>
        </div>
      </div>
    </>
  );
}

export default Header;
