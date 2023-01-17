import React, { useState } from "react";
import Button from "./Button";
import { BsFillReplyFill } from "react-icons/bs";
import MainCommentReplyBox from "./MainCommentReplyBox";
import Replies from "./Replies";
import CurrentUserComment from "./CurrentUserComment";

const Comment = ({ item, currentuser, isreply = false, userID }) => {
  const [replyBox, setReplyBox] = useState({
    replyBtn: false,
  });

  let replydiv = null;
  if (item.replies && item.replies.length > 0 && !isreply) {
    replydiv = (
      <Replies
        isreply={true}
        Allreplies={item.replies}
        currentuser={currentuser}
        userID={userID}
      />
    );
  }

  if (item.user.username === currentuser.username) {
    return <CurrentUserComment item={item} userID={userID} />;
  }

  return (
    <section>
      <div className="grid grid-cols-[max-content,auto] p-6 items-center gap-x-6 bg-white shadow-sm rounded-lg">
        <Button score={item.score} />
        <div className="grid grid-rows-[max-content,auto] gap-y-3">
          <div className="flex items-center justify-between h-fit select-none">
            <div className="flex items-center gap-3">
              <img
                src={item.user.image.png}
                className="w-9 select-none"
                alt="ammy"
              />
              <span className="font-semibold tracking-wide text-slate-800 capitalize">
                {item.user.username}
              </span>
              <span className="text-gray-500">{item.createdAt}</span>
            </div>
            <div
              className="flex items-center gap-1 text-blue-800 text-xl hover:text-opacity-50 cursor-pointer"
              onClick={() =>
                setReplyBox({ ...replyBox, replyBtn: !replyBox.replyBtn })
              }
            >
              <BsFillReplyFill />
              <h5 className="font-semibold">Reply</h5>
            </div>
          </div>
          <p className="text-neutral-600 leading-6 mt-1 font-normal ">
            {item.replyingTo ? (
              <span className="text-blue-800 font-semibold pr-2">
                @{item.replyingTo}
              </span>
            ) : null}
            {item.content}
          </p>
        </div>
      </div>
      {replyBox.replyBtn && (
        <MainCommentReplyBox
          user={currentuser}
          isreply={true}
          userId={item.id}
          replyingTo={item.user.username}
          setReplyBox={setReplyBox}
          userID={userID}
        />
      )}
      {replydiv}
    </section>
  );
};

export default Comment;
