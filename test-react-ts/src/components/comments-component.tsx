import React, { useState } from "react";

interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
  replies?: Comment[];
}

interface CommentProps {
  comment: Comment;
  onReply: (parentId: string, replyText: string) => void;
}

const CommentComponent: React.FC<CommentProps> = ({ comment, onReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText("");
      setShowReplyBox(false);
    }
  };

  return (
    <div style={{ marginLeft: "20px", marginTop: "10px" }}>
      <div>
        <strong>{comment.author}</strong> <small>{comment.createdAt}</small>
        <p>{comment.text}</p>
        <button onClick={() => setShowReplyBox((prev) => !prev)}>
          {showReplyBox ? "Cancel" : "Reply"}
        </button>
      </div>

      {showReplyBox && (
        <div style={{ marginTop: "10px" }}>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={2}
            style={{ width: "100%", resize: "none" }}
          />
          <button onClick={handleReplySubmit}>Post Reply</button>
        </div>
      )}

      {comment.replies &&
        comment.replies.map((reply) => (
          <CommentComponent key={reply.id} comment={reply} onReply={onReply} />
        ))}
    </div>
  );
};

export default CommentComponent;
