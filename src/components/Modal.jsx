import React from "react";

const Modal = ({ setShowModal, showModal, deleteFun }) => {
  return (
    <div className="fixed h-full w-full top-0 left-0 flex justify-center items-center bg-[#00000040]">
      <div className="flex text-center flex-col gap-4 bg-white max-w-md rounded-lg p-6">
        <h3 className="text-2xl font-bold text-slate-800">Delete comment</h3>
        <p className="text-neutral-600 text-lg">
          Are you sure want to delete this comment? This will remove the comment
          and can't be undone.
        </p>
        <div className="flex gap-7 justify-center mt-4">
          <button
            className="text-white bg-slate-700 hover:bg-slate-900 rounded-lg text-lg font-medium px-3 py-2 tracking-wider"
            onClick={() => setShowModal(false)}
          >
            NO,CANCEL
          </button>
          <button
            className="text-white bg-red-500 hover:bg-red-600 rounded-lg text-lg font-medium px-3 py-2 tracking-wider"
            onClick={deleteFun}
          >
            YES,DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
