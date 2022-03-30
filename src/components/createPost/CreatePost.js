import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import { AppContext } from "../../App";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase-config";
import { nanoid } from "nanoid";

// TESTING
// const initialValue = {
//   postid: "as6d5421",
//   voteCount: 0,
//   image: "",
//   userid: "asd564654",
//   title: "first post",
//   comments: [],
// };

const initialValue = {
  imageFile: {},
  caption: "",
};

function CreatePost() {
  const { createPost } = useContext(AppContext);
  const [caption, setcaption] = useState(initialValue.caption);
  const [imageFile, setImageFile] = useState(initialValue.imageFile);
  const [imageError, setimageError] = useState(false);

  useEffect(() => {
    addImage(imageFile);
  }, [imageFile]);

  const handleCaptionChange = (e) => {
    setcaption(e.target.value);
  };

  // TODO : UPLOAD AND ADD IMAGE TO FIRESTORE
  const validateImageSize = (file) => {
    const minFileSize = 500;
    const fileSize = parseInt(file.size / 1024).toFixed(2);

    console.log(`#### FILE SIZE : ${fileSize}`);

    if (!(fileSize > minFileSize)) {
      return true;
    }
    return false;
  };

  const getImageReference = async (fileName) => {
    console.log(`INTO IMAGE REFERENCE FILE`);
    return await getDownloadURL(ref(storage, `images/${fileName}`));
  };

  const addImage = async (file) => {
    if (!file) {
      return;
    }
    // const file = e.target.files[0];
    if (!validateImageSize(file)) {
      setimageError(true);
      return;
    }

    setImageFile(file);

    // setImageFile(file);
  };

  const addImageToFirebase = async () => {
    if (!imageFile) {
      return "";
    }
    const file = imageFile;
    console.log(`IMAGE FILE : ${imageFile}`);
    const imageUuid = nanoid();
    const storageRef = ref(storage, `/images/${imageUuid}`);
    await uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!\n");
      return snapshot;
    });

    return await getImageReference(imageUuid);
  };

  const handleImageChange = (e) => {
    setimageError(false);
    const file = e.target.files[0];
    addImage(file);
  };

  // END

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const imageUrl = await addImageToFirebase();
    console.log(imageUrl);
    const newPost = { title: caption, imageUrl: imageUrl };
    console.log(newPost);
    await createPost(newPost);
    setImageFile(initialValue.imageFile);
    setcaption(initialValue.caption);
  };

  return (
    <>
      <form className="border-black flex p-2 justify-evenly gap-5 bg-slate-400 rounded-xl">
        <input
          type="text"
          name=""
          id=""
          value={caption}
          onChange={(e) => handleCaptionChange(e)}
          className=" w-full rounded-md p-1 px-2"
          required={true}
        />
        <input
          type="file"
          name=""
          accept="image/*"
          onChange={(e) => handleImageChange(e)}
          id=""
        />
        <button
          className=" border-black px-3 bg-white rounded-md"
          onClick={(e) => handleSubmitPost(e)}
        >
          Post
        </button>
      </form>
      {imageError ? <h3>File size too big</h3> : ""}
    </>
  );
}

export default CreatePost;
