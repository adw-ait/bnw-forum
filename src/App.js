import React, { useEffect, useState } from "react";
import Feed from "./pages/Feed/Feed";
import CreatePost from "./components/createPost/CreatePost";
import { addDocument } from "./utils";
import { nanoid } from "nanoid";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const AppContext = React.createContext();

export const initialValue = {
  CREATEPOST: {
    votes: "0",
    imageUrl: "",
    title: "",
    authorId: "", // create if not already present, store in localstorage
    comments: [],
  },
};

function App() {
  const [postStore, setpostStore] = useState([]);

  //!* GET ALL POSTS ON FIRST VISIT
  useEffect(() => {
    getAllPosts();
  }, []);

  //!* create new user
  const assignUserId = () => {
    if (!localStorage.getItem("userid")) {
      const userid = nanoid(5);
      localStorage.setItem("userid", userid);
      return userid;
    }
    const userid = localStorage.getItem("userid");
    return userid;
  };

  //!* CREATE POST
  const createPost = async (postDetails) => {
    // const createdOn = await db.firestore.Timestamp.fromDate(new Date());
    // console.log(createdOn);
    if (postDetails.title.length === 0) {
      console.log("no title");
    } else {
      const authorId = assignUserId();
      const newPost = {
        ...initialValue.CREATEPOST,
        ...postDetails,
        authorId,
        // createdOn,
      };
      await addDocument(newPost);
      await getAllPosts();
    }
  };

  // !* : GET POSTS
  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    // setpostStore(querySnapshot);
    let tempArray = [];
    querySnapshot.forEach((doc) => {
      const tempObj = { ...doc.data(), id: doc.id };
      tempArray.push(tempObj);
    });

    setpostStore(tempArray);
  };

  // TODO : GET SINGLE POST
  // const getOnePost = async (docId) => {
  //   // const docRef = doc(db, "posts", `${docId}`);
  //   // const newData = await getDoc(docRef);
  //   // console.log(postIndex);
  //   const postIndex = postStore.map((dat) => dat.id).indexOf(docId);

  //   // const updatedStore = [...postStore, { id: newData.id, ...newData.data() }];
  //   // setpostStore(updatedStore);
  // };

  //!* VOTES
  //!* VOTES VALIDATER
  const votesValidater = (postID) => {
    const sesssionUpvoteStore = JSON.parse(
      sessionStorage.getItem("upvoteByUser")
    );
    const userID = assignUserId();

    if (!sesssionUpvoteStore) {
      console.log(`session storage is empty`);
      const userVotes = {
        [userID]: [postID],
      };

      // console.log(sesssionUpvoteStore);
      sessionStorage.setItem("upvoteByUser", JSON.stringify(userVotes));
      return true;
    }
    if (sesssionUpvoteStore[userID].includes(postID)) {
      console.log(sesssionUpvoteStore[userID].includes(postID));
      return false;
    } else {
      sesssionUpvoteStore[userID].push(postID);
      sessionStorage.setItem(
        "upvoteByUser",
        JSON.stringify(sesssionUpvoteStore)
      );
      return true;
    }
  };

  // !* UPDATE VOTES IN FIREBASE
  const votesHandler = async (voteData) => {
    const { id, currentVotes, voteType } = voteData;

    if (!votesValidater(id)) {
      return;
    }

    const postDocRef = doc(db, "posts", `${id}`);

    switch (voteType) {
      case "UPVOTE":
        console.log("upvoted");
        (async () => {
          const voteCount = parseInt(currentVotes + 1);
          await updateDoc(postDocRef, {
            votes: voteCount,
          });
        })();
        break;

      case "DOWNVOTE":
        (async () => {
          const voteCount =
            parseInt(currentVotes - 1) < 0 ? 0 : parseInt(currentVotes - 1);
          await updateDoc(postDocRef, {
            votes: voteCount,
          });
        })();
        break;

      default:
        return null;
    }

    // await getOnePost(voteData.id);
    await getAllPosts();
  };

  //!* ADD COMMENT
  const addComment = async (commentData) => {
    const { id, comments, commentText } = commentData;

    if (commentText.length === 0) {
      console.log("no content");
    } else {
      const newCommentData = {
        commentreply: commentText,
        commentuserid: assignUserId(),
      };

      const currentComments = [...comments, { ...newCommentData }];
      const postDocRef = doc(db, "posts", `${id}`);
      await updateDoc(postDocRef, {
        comments: currentComments,
      });

      await getAllPosts();
    }
  };

  return (
    <AppContext.Provider
      value={{ createPost, postStore, votesHandler, addComment }}
    >
      <CreatePost />
      <Feed />
    </AppContext.Provider>
  );
}

export default App;
