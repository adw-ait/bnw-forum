import React, { useContext, useState } from "react";
import { AppContext } from "../../App";

function Comments(props) {
  const { post } = props;
  const { addComment } = useContext(AppContext);
  const [commentText, setcommentText] = useState("");

  const sendComment = () => {
    const data = { commentText, id: post.id, comments: post.comments };
    setcommentText("");
    addComment(data);
  };

  
  const showReply = () => {
    this.setState = {
      show: true,
    };
  };

  return (
    <>
      <div className="allcomments flex flex-col">
        {post.comments &&
          post.comments.map((comm) => {
            return (
              <div className="comment flex flex-col border bg-gray-200 rounded-lg p-2 mb-2">
                <span className="commentuserid font-bold flex-wrap">
                  {">>"}Anonymous (ID : {comm.commentuserid}) &nbsp;
                  {/* <span className="timestamp text-xs">2hr ago</span> */}
                </span>
                <span className="commentreply">{comm.commentreply}</span>
                <span className="reply flex gap-5">
                  <h1
                    className="font-bold text-red-500"
                    onClick={() => showReply()}
                  >
                    reply
                  </h1>
                </span>
                <div>
{/* 
                  {
                      this.state.show &&
                      <div>
                        <input
                         type="text"
                         className="border border-black "
                          value={commentText}
                    onChange={(e) => setcommentText(e.target.value)}
                  />
                  <button
                    className="border border-black p-1"
                    onClick={() => sendComment()}>
                    reply
                  </button>
                      </div>
                  
                   
                  } */}

                </div>


                
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Comments;
