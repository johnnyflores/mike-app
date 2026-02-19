import React, { useState, type ChangeEvent } from "react";
import {
  InputBase,
  Button,
  Card,
  CardMedia,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { BASE_URL } from "../../utils/constants";
import type { PostType } from "../../types/post";

interface Props {
  authToken: string;
  authTokenType: string;
  userId: string;
  onPostCreated: (post: PostType) => void;
}

const ImageUpload: React.FC<Props> = ({
  authToken,
  authTokenType,
  userId,
  onPostCreated,
}) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setPreviewUrl(selected ? URL.createObjectURL(selected) : null);
  };

  const handleDeleteFile = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const uploadRes = await fetch(`${BASE_URL}post/image`, {
        method: "POST",
        headers: { Authorization: `${authTokenType} ${authToken}` },
        body: formData,
      });
      if (!uploadRes.ok) throw new Error("Failed to upload image");
      const { filename } = await uploadRes.json();

      const postRes = await fetch(`${BASE_URL}post`, {
        method: "POST",
        headers: {
          Authorization: `${authTokenType} ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: filename,
          image_url_type: "relative",
          caption,
          creator_id: userId,
        }),
      });
      if (!postRes.ok) throw new Error("Failed to create post");

      const newPost: PostType = await postRes.json();
      onPostCreated(newPost);

      setCaption("");
      setFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error(err);
      alert("Error uploading post");
    }
  };
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1,
        gap: 1,
        borderRadius: 2,
      }}
    >
      {previewUrl && (
        <Card sx={{ width: 60, height: 60, position: "relative" }}>
          <CardMedia
            component="img"
            image={previewUrl}
            alt="preview"
            sx={{ objectFit: "cover" }}
          />
          <IconButton
            size="small"
            onClick={handleDeleteFile}
            sx={{
              position: "absolute",
              top: -6,
              right: -6,
              bgcolor: "rgba(255,255,255,0.8)",
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Card>
      )}
      <InputBase
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        sx={{ flex: 1, pl: 1 }}
      />
      <Button component="label" startIcon={<InsertPhotoIcon />}>
        {file ? "Change" : "Photo"}
        <input type="file" hidden onChange={handleSelectFile} />
      </Button>
      <Button variant="contained" onClick={handleUpload} disabled={!file}>
        Upload
      </Button>
    </Paper>
  );
};

export default ImageUpload;
