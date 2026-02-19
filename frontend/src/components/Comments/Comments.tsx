import React, {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { BASE_URL } from "../../utils/constants";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import type { CommentType, PostType } from "../../types/post";

interface CommentsProps {
  post: PostType;
  authToken: string | null;
  authTokenType: string | null;
  username: string;
}

const Comments: React.FC<CommentsProps> = ({
  post,
  authToken,
  authTokenType,
  username,
}) => {
  const [comments, setComments] = useState<CommentType[]>(post.comments || []);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    try {
      const res = await fetch(`${BASE_URL}comment/all/${post.id}`);
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data: CommentType[] = await res.json();
      setComments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!authToken || !authTokenType || !newComment.trim()) return;

    try {
      const body = JSON.stringify({
        username,
        text: newComment,
        post_id: post.id,
      });

      const res = await fetch(`${BASE_URL}comment/`, {
        method: "POST",
        headers: {
          Authorization: `${authTokenType} ${authToken}`,
          "Content-Type": "application/json",
        },
        body,
      });

      if (!res.ok) throw new Error("Failed to post comment");

      await fetchComments();
      setNewComment("");
    } catch (err) {
      console.error(err);
      alert("Error posting comment");
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ px: 2, pb: 2 }}>
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ maxHeight: 200, overflowY: "auto", mb: 1 }}>
        {comments.map((comment) => (
          <Typography
            key={comment.id ?? `${comment.username}-${comment.text}`}
            variant="body2"
            sx={{ mb: 0.5 }}
          >
            <strong>{comment.username}: </strong>
            {comment.text}
          </Typography>
        ))}
      </Box>
      {authToken && (
        <Box
          component="form"
          onSubmit={handlePostComment}
          sx={{ display: "flex", gap: 1, mt: 1 }}
        >
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewComment(e.target.value)
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!newComment.trim()}
          >
            Post
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Comments;
