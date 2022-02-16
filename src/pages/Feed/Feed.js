import { data } from "../../data/data";
import React from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

function Feed() {
  return (
    <div>
      {data.map((post) => {
        return (
          <div className="flex flex-row border max-w-2xl m-5 rounded-lg p-1 bg-white text-sm ">
            <div className="votes flex flex-col items-center p-2">
              <span className="upvote">
                <AiOutlineArrowUp />
              </span>
              <span className="votecount">{post.voteCount}</span>
              <span className="downvote">
                <AiOutlineArrowDown />
              </span>
            </div>
            <div className="content flex flex-col p-2">
              <div className="postheader flex flex-row pb-3">
                <span className="image">
                  <img src={post.image} alt="" />
                </span>
                <div className="caption flex flex-col p-4">
                  <div className="userid">
                    {">>"}Anonymous (ID :{" "}
                    <span className="text-red-500">{post.userid}</span>) &nbsp;
                    <span className="timestamp text-xs">2hr ago</span>
                  </div>

                  <span className="title">{post.title}</span>
                  <span className="reply">
                    <button>reply to comments</button>
                  </span>
                </div>
              </div>
              <div className="allcomments flex flex-col">
                {post.comments.map((comm) => {
                  return (
                    <div className="comment flex flex-col border bg-gray-200 rounded-lg p-2 mb-2">
                      <span className="commentuserid">
                        {">>"}Anonymous (ID : {comm.commentuserid}) &nbsp;
                        <span className="timestamp text-xs">2hr ago</span>
                      </span>
                      <span className="commentreply">{comm.commentreply}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Feed;
