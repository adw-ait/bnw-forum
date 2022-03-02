import { data } from "../../data/data";
import React from "react";
import Post from "../../components/post/Post";

function Feed() {
  return (
    <div>
      {data.map((post) => {
        return <Post data={post} />;
      })}
    </div>
  );
}

export default Feed;
