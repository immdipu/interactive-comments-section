import React, { useState } from "react";
import { BsTrashFill, BsPencilFill } from "react-icons/bs";
import { useCommentContext } from "../Comment_context";
import Button from "./Button";
import Modal from "./Modal";

const CurrentUserComment = ({ item, userID }) => {
  const { data, setData, timeSince } = useCommentContext();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, SetEditing] = useState(false);
  const [newText, setNewText] = useState(item.content);
  let modal = null;

  const updateComment = () => {
    SetEditing(false);
    if (item.replyingTo) {
      let newData = { ...data };
      let parentIndex = newData.comments.findIndex(
        (item) => item.id === userID
      );
      let replyIndex = newData.comments[parentIndex].replies.findIndex(
        (reply) => reply.id === item.id
      );
      newData.comments[parentIndex].replies[replyIndex].content = newText;
      setData(newData);
    } else {
      let newData = { ...data };
      let commentIndex = newData.comments.findIndex(
        (element) => element.id === item.id
      );

      newData.comments[commentIndex].content = newText;
      setData(newData);
    }
  };

  let content = (
    <p className="text-neutral-600 leading-6 mt-1 font-normal ">
      {item.replyingTo ? (
        <span className="text-blue-800 font-semibold pr-2">
          @{item.replyingTo}
        </span>
      ) : null}
      {item.content}
    </p>
  );

  let EditUpdateBtn = null;

  if (isEditing) {
    content = (
      <p className="text-neutral-600 leading-6 mt-1 font-normal ">
        <textarea
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          cols="10"
          rows="4"
          className="w-full outline-none border-[1px] px-3 py-2 rounded-xl border-neutral-500"
        >
          {item.content}
        </textarea>
      </p>
    );

    EditUpdateBtn = (
      <div>
        <button
          className="bg-blue-700 float-right mr-5 text-white px-3 py-2 w-fit hover:opacity-60 rounded-md font-semibold  tracking-wider"
          onClick={updateComment}
        >
          UPDATE
        </button>
      </div>
    );
  }

  const deleteFun = () => {
    if (item.replyingTo) {
      let newData = { ...data };
      let parentIndex = newData.comments.findIndex(
        (item) => item.id === userID
      );
      let newReplies = newData.comments[parentIndex].replies.filter(
        (reply) => reply.id !== item.id
      );
      newData.comments[parentIndex].replies = newReplies;
      setData(newData);
    } else {
      let newData = { ...data };
      let deleteItem = newData.comments.filter(
        (element) => element.id !== item.id
      );
      setData((prev) => {
        return { ...prev, comments: deleteItem };
      });
    }
  };

  if (showModal) {
    modal = (
      <Modal
        setShowModal={setShowModal}
        showModal={showModal}
        deleteFun={deleteFun}
      />
    );
  }

  return (
    <section>
      <div className="grid grid-cols-[max-content,auto] p-6 items-center gap-x-6 bg-white shadow-sm rounded-lg">
        <div className="disabled:opacity-40 pointer-events-none">
          <Button score={item.score} />
        </div>

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
              <span className="text-gray-500">{timeSince(item.createdAt)}</span>
            </div>
            <div className="flex gap-8">
              <div
                className="flex items-center gap-2 text-red-500 cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                <BsTrashFill />
                <h5 className="font-semibold text-base">Delete</h5>
              </div>
              <div
                className="flex text-blue-700 items-center gap-2 cursor-pointer"
                onClick={() => SetEditing((prev) => !prev)}
              >
                <BsPencilFill />
                <h5 className="font-semibold">Edit</h5>
              </div>
            </div>
          </div>
          {content}
          {EditUpdateBtn}
        </div>
      </div>
      {modal}
    </section>
  );
};

export default CurrentUserComment;
