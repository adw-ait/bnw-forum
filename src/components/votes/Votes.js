import React from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
function Votes(props) {
  const post = props.data;
  return (
    <>
      <div className="votes flex flex-col items-center p-2">
        <span className="upvote">
          <AiOutlineArrowUp />
        </span>
        <span className="votecount">{post.voteCount}</span>
        <span className="downvote">
          <AiOutlineArrowDown />
        </span>
      </div>
    </>
  );
}

export default Votes;
