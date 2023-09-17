import { useEffect, useState } from "react";
import CommentInputs from "./CommentInputs";
import { Deletei, Editi, Replyi } from "../constants";
import { formatDistanceToNow } from "date-fns";
import DOMPurify from "dompurify";
const Comment = ({
  commentD,
  userImg,
  rChange,
  userId,
  mainCommentId,
  mainData,
}) => {
  const [isReply, setIsReply] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [filteredCom, setFilterCom] = useState("");
  const timeC = formatDistanceToNow(commentD.timestamp);
  useEffect(() => {
    const comment1 = commentD.comment;
    const tagIndex = comment1.indexOf("@");
    const spaceIndex = comment1.indexOf(" ", tagIndex);
    const endIndex = spaceIndex === -1 ? comment1.length : spaceIndex;
    const tagname = comment1.substring(tagIndex + 1, endIndex);

    const foundTag = (tag, data) => {
      for (const comment of data) {
        if (comment.name === tag) {
          return comment1.replace(
            new RegExp(`@${tag}`, "g"),
            `<span>@${tag}</span>`
          );
        }
        if (comment.replys) {
          const nested = foundTag(tag, comment.replys);
          if (nested) {
            return nested;
          }
        }
      }
      return false;
    };
    const filtered = foundTag(tagname, mainData);
    setFilterCom(filtered ? DOMPurify.sanitize(filtered) : comment1);
  }, [commentD.comment, mainData]);

  return (
    <>
      <div className="container">
        <div className="commentItems">
          <div className="commentItemContainer">
            <div className="commentItem_1">
              <span
                onClick={() => {
                  if (commentD.id === userId) return;
                  rChange(undefined, undefined, "plus", commentD.cId);
                }}
              >
                <svg
                  width="11"
                  height="11"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#C5C6EF"
                >
                  <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" />
                </svg>
              </span>
              <p>{commentD.votes.reduce((t, c) => t + c.vote, 0)}</p>
              <span
                onClick={() => {
                  if (commentD.id === userId) return;
                  rChange(undefined, undefined, "minus", commentD.cId);
                }}
              >
                <svg
                  width="11"
                  height="3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#C5C6EF"
                >
                  <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" />
                </svg>
              </span>
            </div>
            <div className="commentItem_2">
              <div>
                {" "}
                <span>
                  <img src={commentD.img} alt="" />
                </span>
                <p>{commentD.name}</p>
                {commentD.id === userId && (
                  <p className="commentItem_2_3">you</p>
                )}
                <p className="commentItem_2_4">{timeC} ago</p>
              </div>
              {isEdit ? (
                <CommentInputs
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  postComment={commentD.comment}
                  parentId={commentD.cId}
                  rChange={rChange}
                />
              ) : (
                <p dangerouslySetInnerHTML={{ __html: filteredCom }}></p>
              )}
            </div>
            {commentD.id === userId ? (
              <div className="commentItem_3">
                <div onClick={() => setModal(true)}>
                  {" "}
                  <span>
                    <img src={Deletei} />
                  </span>
                  <p>Delete</p>
                </div>
                <div onClick={() => setIsEdit((p) => !p)}>
                  {" "}
                  <span>
                    <img src={Editi} />
                  </span>
                  <p>Edit</p>
                </div>
              </div>
            ) : (
              <div onClick={() => setIsReply(!isReply)}>
                <div>
                  {" "}
                  <span>
                    <img src={Replyi} alt="" />
                  </span>
                  <p> Reply</p>
                </div>
              </div>
            )}
          </div>
          {isReply && (
            <CommentInputs
              parentId={commentD.cId}
              userImg={userImg}
              isReply={isReply}
              isEdit={isEdit}
              setIsReply={setIsReply}
              setIsEdit={setIsEdit}
              rChange={rChange}
              tagName={commentD.name}
              mainCommentId={mainCommentId}
            />
          )}
          <div className={commentD?.replys?.length > 0 ? "replyItem" : ""}>
            <div></div>
            <div>
              {" "}
              {commentD?.replys?.map((v, i) => {
                return (
                  <Comment
                    commentD={v}
                    key={i}
                    userImg={userImg}
                    userId={userId}
                    rChange={rChange}
                    mainCommentId={commentD.cId}
                    mainData={mainData}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <div className="modal">
          <div className="modal__container">
            <h3>Delete Comment</h3>
            <p>
              Are you sure you want to delete this comment? This will remove the
              comment and can`t be undone.
            </p>
            <div className="modal__buttons">
              <button onClick={() => setModal(false)}>NO,CANCEL</button>{" "}
              <button
                onClick={() =>
                  rChange(undefined, undefined, "del", commentD.cId)
                }
              >
                YES, DELETE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
