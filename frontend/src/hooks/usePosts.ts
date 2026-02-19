import { useState, useEffect } from "react";
import type { PostType } from "../types/post";
import { fetchPostsApi } from "../utils/api";

export const usePosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data: PostType[] = await fetchPostsApi();
        const sorted = data.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );
        setPosts(sorted);
      } catch (err) {
        console.error(err);
        alert("Failed to load posts");
      }
    };
    fetchPosts();
  }, []);

  const addPost = (post: PostType) => setPosts((prev) => [post, ...prev]);

  return { posts, addPost };
};
