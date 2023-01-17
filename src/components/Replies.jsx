import React from "react";
import Comment from "./Comment";

const Replies = ({ Allreplies, currentuser, userID }) => {
  return (
    <div className="grid grid-cols-[80px,auto] my-3">
      <div className="h-full w-[2px] bg-neutral-300 rounded-lg ml-10"></div>
      <div className="grid grid-cols-1 gap-y-4">
        {Allreplies.map((item) => (
          <Comment
            item={item}
            key={item.id}
            currentuser={currentuser}
            isreply={true}
            userID={userID}
          />
        ))}
      </div>
    </div>
  );
};

export default Replies;
