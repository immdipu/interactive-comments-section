import Comment from "./components/Comment";
import MainCommentReplyBox from "./components/MainCommentReplyBox";
import { useCommentContext } from "./Comment_context";

function App() {
  const { data } = useCommentContext();
  return (
    <div className="max-w-2xl w-full m-auto mt-20 flex flex-col gap-4">
      {data.comments.map((item) => {
        return (
          <Comment
            key={item.id}
            currentuser={data.currentUser}
            item={item}
            isreply={false}
            userID={item.id}
          />
        );
      })}
      <MainCommentReplyBox />
    </div>
  );
}

export default App;
