import React, { useState } from "react";
import CommentComponent from "./comments-component";

interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
  replies?: Comment[];
}

const CommentsContainer: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      text: "This is a great post!",
      author: "John Doe",
      createdAt: "2025-01-17",
      replies: [
        {
          id: "2",
          text: "Thanks, John!",
          author: "Author",
          createdAt: "2025-01-17",
        },
      ],
    },
    {
      id: "2",
      text: "This is another great post!",
      author: "Tobi Ibuola",
      createdAt: "2025-01-17",
    },
  ]);

  const handleAddReply = (parentId: string, replyText: string) => {
    setComments((prevComments) => {
      const addReplyRecursive = (comments: Comment[]): Comment[] => {
        return comments.map((comment) => {
          if (comment.id === parentId) {
            const newReply: Comment = {
              id: Date.now().toString(),
              text: replyText,
              author: "You",
              createdAt: new Date().toLocaleString(),
            };
            return {
              ...comment,
              replies: comment.replies
                ? [...comment.replies, newReply]
                : [newReply],
            };
          } else if (comment.replies) {
            return {
              ...comment,
              replies: addReplyRecursive(comment.replies),
            };
          }
          return comment;
        });
      };

      return addReplyRecursive(prevComments);
    });
  };

  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <CommentComponent
          key={comment.id}
          comment={comment}
          onReply={handleAddReply}
        />
      ))}
    </div>
  );
};

export default CommentsContainer;
