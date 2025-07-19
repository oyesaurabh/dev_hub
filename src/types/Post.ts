import { z } from "zod";
import { userSchema } from "./User";

export const postSchema = z.object({
  _id: z.string(),
  user: userSchema,
  text: z.string().optional(),
  img: z.string().optional(),
  video: z.string().optional(),
  cuezBadge: z.string().optional(),
  likes: z.array(z.string()),
  bookmarks: z.array(z.string()),
  parent: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  editedAt: z.string().optional(),
});

export type Post = z.infer<typeof postSchema>;

export interface CreatePostData {
  text?: string;
  img?: string;
  video?: string;
  parentId?: string;
}

export interface CreatePostResponse {
  message: string;
  status: boolean;
}

export type GetPostsResponse = {
  message: string;
  posts: Post[];
  status: boolean;
};

export interface DeletePostResponse {
  message: string;
  status: boolean;
}

export interface EditPostResponse {
  message: string;
  status: boolean;
}

export interface EditPostData {
  text?: string;
  img?: string;
  video?: string;
}

export interface LikeUnlikePostResponse {
  message: string;
  status: boolean;
}

export interface IsLikedResponse {
  message: string;
  liked: boolean;
  status: boolean;
}

export interface GetPostByIdResponse {
  message: string;
  post: Post;
  status: boolean;
}

export interface CreateCommentData {
  text?: string;
  img?: string;
  video?: string;
  user: string;
}

export interface CommentPostResponse {
  message: string;
  status: boolean;
}

export interface GetUserPostsResponse {
  message: string;
  userPosts: Post[];
}

export interface BookmarkPostResponse {
  message: string;
}
export interface IsBookmarkedResponse {
  message: string;
  isBookmarked: boolean;
}
export interface GetReplyCountResponse {
  message: string;
  count: number;
}

export interface GetLikedPostsResponse {
  message: string;
  likedPosts: Post[];
}
export interface GetParentThreadResponse {
  message: string;
  thread: Post[];
}
export interface GetRepliesResponse {
  message: string;
  replies: Post[];
}
export interface GetBookmarkedPostsResponse {
  message: string;
  posts: Post[];
}
