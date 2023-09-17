import React, { useEffect, useState, useRef } from "react";

const CommentInputs = ({
  parentId,
  userImg,
  rChange,
  isReply,
  isEdit,
  setIsReply,
  setIsEdit,
  postComment,
  tagName,
  mainCommentId,
}) => {
  const [text, setText] = useState(tagName ? `@${tagName} ` : "");
  const textAreaRef = useRef();
  useEffect(() => {
    if (isReply) {
      textAreaRef.current.focus();
    }
    if (isEdit) {
      textAreaRef.current.focus();
    }

    textAreaRef.current.style.height = `${
      textAreaRef.current.scrollHeight + 2
    }px`;
  }, [isEdit, isReply, text]);

  useEffect(() => {
    if (isEdit) {
      setText(postComment);
    }
    textAreaRef.current.selectionStart = textAreaRef.current.value.length;
    textAreaRef.current.selectionEnd = textAreaRef.current.value.length;
  }, [isEdit, postComment]);

  const submitB = () => {
    if (!text) {
      setIsReply(false);
      setIsEdit(false);
      return;
    }
    if (isReply) {
      rChange(text, undefined, "rep", mainCommentId ? mainCommentId : parentId),
        setText("");
      setIsReply(false);
      return;
    }
    if (isEdit) {
      rChange(text, undefined, "edit", parentId), setText("");
      setIsEdit(false);
    }

    rChange(text, undefined, undefined, parentId), setText("");
  };

  const textAreaC = (e) => {
    const textValue = e.target.value;

    setText(textValue);
  };

  return (
    <div
      className={`inputContainer commentItemContainer ${isEdit ? "edit" : ""}`}
    >
      <div>
        <img src={userImg} />
      </div>
      <textarea
        name="text"
        value={text}
        onChange={textAreaC}
        ref={textAreaRef}
        placeholder="Add a comment..."
      ></textarea>

      <button onClick={() => submitB()}>
        {isReply ? "REPLY" : isEdit ? "UPDATE" : "SEND"}
      </button>
    </div>
  );
};

export default CommentInputs;
