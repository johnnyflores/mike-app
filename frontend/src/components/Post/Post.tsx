import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { BASE_URL } from "../../utils/constants";
import Comments from "../Comments/Comments";
import type { PostType } from "../../types/post";

interface Props {
  post: PostType;
  authToken: string | null;
  authTokenType: string | null;
  username: string;
}

const Post: React.FC<Props> = ({
  post,
  authToken,
  authTokenType,
  username,
}) => {
  const [imageUrl, setImageUrl] = useState(post.image_url);

  useEffect(() => {
    setImageUrl(
      post.image_url_type === "absolute"
        ? post.image_url
        : `${BASE_URL}${post.image_url}`,
    );
  }, [post]);

  const handleDelete = async () => {
    if (!authToken || !authTokenType) return;
    try {
      const res = await fetch(`${BASE_URL}post/delete/${post.id}`, {
        method: "GET",
        headers: { Authorization: `${authTokenType} ${authToken}` },
      });
      if (!res.ok) throw new Error("Failed to delete post");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        maxWidth: 600,
        mx: "auto",
        my: 3,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
        }}
      >
        <Avatar alt="avatar" sx={{ mr: 2 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Typography variant="h6">{post.user.username}</Typography>
          {post.user.username === username && (
            <Button size="small" color="error" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Box>
      </Box>
      <Box
        component="img"
        src={imageUrl || undefined}
        alt={post.caption || "Post image"}
        sx={{
          width: "100%",
          objectFit: "cover",
        }}
      />
      <Typography sx={{ p: 2 }}>{post.caption}</Typography>
      <Comments
        post={post}
        authToken={authToken}
        authTokenType={authTokenType}
        username={username}
      />
    </Box>
  );
};

export default Post;
