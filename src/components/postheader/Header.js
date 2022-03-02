import React from "react";

function Header(props) {
  const post = props.data;
  return (
    <>
      <div className="postheader flex flex-row pb-3">
        <span className="image">
          <img src={post.image} alt="" />
        </span>
        <div className="caption flex flex-col p-4">
          <div className="userid">
            {">>"}Anonymous (ID :{" "}
            <span className="text-red-500">{post.userid}</span>) &nbsp;
            <span className="timestamp text-xs">2hr ago</span>
          </div>

          <span className="title">{post.title}</span>
          <span className="reply">
            <button>reply to comments</button>
          </span>
        </div>
      </div>
    </>
  );
}

export default Header;
