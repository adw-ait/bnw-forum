import React from "react";
import Comments from "../comments/Comments";
import Header from "../postheader/Header";
import Votes from "../votes/Votes";

function Post(props) {
  const post = props.data;
  return (
    <div className="flex flex-row border max-w-2xl m-5 rounded-lg p-1 bg-white text-sm ">
      {/* VOTES - START */}
      <Votes data={post} />
      {/* VOTES - END */}

      <div className="content flex flex-col p-2">
        {/* HEADER - START*/}
        <Header data={post} />
        {/* HEADER - END */}

        {/* COMMENTS - START */}
        <Comments data={post} />
        {/* COMMENTS - END */}
      </div>
    </div>
  );
}

export default Post;
