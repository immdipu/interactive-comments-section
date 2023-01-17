import React from "react";
import { useCommentContext } from "../Comment_context";

const MainCommentReplyBox = ({
  isreply = false,
  userId,
  replyingTo,
  setReplyBox,
}) => {
  const { data, setData, setText, text } = useCommentContext();
  const AddComment = () => {
    if (!isreply) {
      let newComment = {
        id: data.comments.length + 1,
        content: text,
        createdAt: Date.now(),
        score: 0,
        user: data.currentUser,
        replies: [],
      };
      let newData = { ...data, comments: [...data.comments, newComment] };
      setData(newData);
    } else {
      let newComment = {
        id: data.comments.length + 10,
        content: text,
        createdAt: Date.now(),
        score: 0,
        replyingTo: replyingTo,
        user: data.currentUser,
      };

      let CommentINDEX;
      CommentINDEX = data.comments.findIndex((item) => item.id === userId);

      if (CommentINDEX === -1) {
        data.comments.forEach((item, index) => {
          let commentIn = item.replies.findIndex((item) => item.id === userId);
          if (commentIn === -1) return;
          CommentINDEX = index;
        });
      }

      let newData = { ...data };
      newData.comments[CommentINDEX].replies = [
        ...newData.comments[CommentINDEX].replies,
        newComment,
      ];
      setData(newData);
      setReplyBox(false);
    }
    setText("");
  };

  return (
    <section className="grid grid-cols-[max-content,auto,max-content] p-6 items-start gap-x-6 bg-white shadow-sm rounded-lg my-3">
      <img
        src={data.currentUser.image.png}
        className="w-9 select-none"
        alt="ammy"
      />
      <textarea
        name="maincommentreply"
        className="border rounded-xl px-3 py-4 text-neutral-600 leading-6 mt-1 font-normal "
        cols="10"
        rows="3"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-700 text-white px-3 py-2 hover:opacity-60 rounded-md font-semibold  tracking-wider"
        onClick={AddComment}
      >
        REPLY
      </button>
    </section>
  );
};

export default MainCommentReplyBox;
