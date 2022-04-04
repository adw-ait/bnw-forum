import React, { useContext } from "react";
import Post from "../../components/post/Post";
import { AppContext } from "../../App";

function Feed() {
  const { postStore } = useContext(AppContext);
  return (
    <div>
      {postStore &&
        postStore.map((post) => {
          return <Post post={post} />;
        })}
    </div>
  );
}

export default Feed;
