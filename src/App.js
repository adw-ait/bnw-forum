import React, { useEffect, useState } from "react";
import Feed from "./pages/Feed/Feed";
import CreatePost from "./components/createPost/CreatePost";
import { addDocument } from "./utils";
import { nanoid } from "nanoid";

export const AppContext = React.createContext();

export const initialValue = {
  CREATEPOST: {
    votes: "0",
    imageUrl: "",
    title: "",
    postId: "",
    authorId: "", // create if not already present, store in localstorage
    comments: [],
  },
};

function App() {
  const [postStore, setpostStore] = useState([]);

  // TODO : CREATE POST

  // create new user
  const assignUserId = () => {
    if (!sessionStorage.getItem("userid")) {
      const userid = nanoid();
      sessionStorage.setItem("userid", userid);
      return userid;
    }
    const userid = sessionStorage.getItem("userid");
    return userid;
  };

  // CREATE POST
  const createPost = async (postDetails) => {
    const authorId = assignUserId();
    const newPost = {
      ...initialValue.CREATEPOST,
      ...postDetails,
      authorId,
    };
    await addDocument(newPost);
  };

  // TODO : GET POST

  return (
    <AppContext.Provider value={{ createPost }}>
      <CreatePost />
      <Feed />
    </AppContext.Provider>
  );
}

export default App;
