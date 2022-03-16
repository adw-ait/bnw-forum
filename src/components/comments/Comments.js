import React from "react";

function Comments(props) {
  const { post } = props;
  return (
    <>
      <div className="allcomments flex flex-col">
        {post.comments &&
          post.comments.map((comm) => {
            return (
              <div className="comment flex flex-col border bg-gray-200 rounded-lg p-2 mb-2">
                <span className="commentuserid">
                  {">>"}Anonymous (ID : {comm.commentuserid}) &nbsp;
                  {/* <span className="timestamp text-xs">2hr ago</span> */}
                </span>
                <span className="commentreply">{comm.commentreply}</span>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Comments;
