import React, { useState } from "react";
import { BsPlus, BsDash } from "react-icons/bs";

const Button = ({ score }) => {
  const [like, setLike] = useState(score);
  return (
    <div className="bg-blue-100 w-fit px-1 py-1 rounded-md grid grid-cols-1 items-center h-fit">
      <BsPlus
        className="text-slate-400 font-semibold text-3xl cursor-pointer hover:text-blue-700"
        onClick={() => setLike((prev) => prev + 1)}
      />
      <h5 className="text-2xl text-blue-800 font-semibold w-full text-center select-none">
        {like}
      </h5>

      <BsDash
        className="text-slate-400 font-semibold text-3xl cursor-pointer hover:text-blue-700"
        onClick={() => setLike((prev) => (prev > 0 ? prev - 1 : 0))}
      />
    </div>
  );
};

export default Button;
