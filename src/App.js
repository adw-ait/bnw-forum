import React from "react";
import Feed from "./pages/Feed/Feed";
import CreatePost from "./components/createPost/CreatePost";

function App() {
  return (
    <div>
      <CreatePost />
      <Feed />
    </div>
  );
}

export default App;
