import { useEffect, useState } from "react";
import "./App.css";
import Comment from "./components/Comment";
import { data, Juli } from "./constants";
import CommentInputs from "./components/CommentInputs";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [activeUser, setActiveUser] = useState({
    id: 2.2,
    votes: [],
    img: Juli,
    name: "juliusomo",
    timestamp: new Date().getTime(),
  });
  const intialData = JSON.parse(localStorage.getItem("mData"));
  const [commentData, setCommentData] = useState(
    intialData ? intialData : data
  );
  const [text, setText] = useState("");
  const rChange = (userR, postOwner, options, commentId) => {
    const idGenerate = uuidv4();

    if (!commentId) {
      setCommentData((p) => {
        return [
          ...p,
          { ...activeUser, comment: userR, cId: idGenerate, replys: [] },
        ];
      });

      return;
    }

    const nUser = {
      ...activeUser,
      comment: userR,

      cId: idGenerate,
    };

    let copyArray = [...commentData];
    function rec(users) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].cId === commentId) {
          if (options === "del") {
            users.splice(i, 1);

            return;
          }
          if (options === "rep") {
            users[i].replys = [...users[i].replys, nUser];
            return;
          }
          if (options === "edit") {
            users[i].comment = userR;

            return;
          }
          if (options === "plus") {
            const found = users[i].votes.find(
              (item) => item.id === activeUser.id
            );
            if (!found) {
              users[i].votes = [
                ...users[i].votes,
                { id: activeUser.id, vote: 1 },
              ];
              return;
            }

            for (let p = 0; p < users[i].votes.length; p++) {
              if (
                users[i].votes[p].id === activeUser.id &&
                users[i].votes[p].vote === 1
              ) {
                return;
              } else if (users[i].votes[p].id === activeUser.id) {
                users[i].votes[p].vote = 0;
                return;
              }
            }
          }
          if (options === "minus") {
            const found = users[i].votes.find(
              (item) => item.id === activeUser.id
            );
            if (!found) {
              users[i].votes = [
                ...users[i].votes,
                { id: activeUser.id, vote: -1 },
              ];
              return;
            }

            for (let p = 0; p < users[i].votes.length; p++) {
              if (
                users[i].votes[p].id === activeUser.id &&
                users[i].votes[p].vote === -1
              ) {
                return;
              } else if (users[i].votes[p].id === activeUser.id) {
                users[i].votes[p].vote = 0;
                return;
              }
            }
          }
        }

        // nested loop
        if (users[i]?.replys?.length > 0) {
          rec(users[i].replys);
        }
      }
    }
    rec(copyArray);

    setCommentData(copyArray);
  };

  useEffect(() => {
    localStorage.setItem("mData", JSON.stringify(commentData));
  }, [commentData]);

  return (
    <main>
      <section>
        {commentData.map((d, i) => (
          <Comment
            commentD={d}
            key={i}
            userImg={activeUser.img}
            userId={activeUser.id}
            rChange={rChange}
            mainData={commentData}
          />
        ))}

        <CommentInputs
          userImg={activeUser.img}
          rChange={rChange}
          text={text}
          setText={setText}
        />
      </section>
    </main>
  );
}

export default App;
