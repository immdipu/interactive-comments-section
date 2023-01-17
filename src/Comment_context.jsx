import React, { useContext, useEffect, useState } from "react";
import datas from "./data.json";

const CommentContext = React.createContext();

const getComments = () => {
  let comments = localStorage.getItem("comments");
  if (comments) {
    return JSON.parse(localStorage.getItem("comments"));
  } else {
    return datas;
  }
};

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(getComments());
  const [text, setText] = useState();

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(data));
  }, [data]);

  const timeSince = (date) => {
    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <CommentContext.Provider
      value={{ data, setData, text, setText, timeSince }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  return useContext(CommentContext);
};
