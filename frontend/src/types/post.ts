import type { UserType } from "./user";

export interface CommentType {
  id?: number;
  username: string;
  text: string;
  timestamp: string;
}

export interface PostType {
  id: number;
  user: UserType;
  caption: string;
  image_url: string;
  image_url_type: "absolute" | "relative";
  timestamp: string;
  comments: CommentType[];
}
