import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useFeedTypeStore } from "@/store";
import { axiosService } from "@/services";
import {
  BookmarkPostResponse,
  CommentPostResponse,
  CreateCommentData,
  CreatePostData,
  CreatePostResponse,
  DeletePostResponse,
  EditPostData,
  EditPostResponse,
  GetPostByIdResponse,
  GetReplyCountResponse,
  GetUserPostsResponse,
  IsBookmarkedResponse,
  IsLikedResponse,
  LikeUnlikePostResponse,
  GetLikedPostsResponse,
  GetParentThreadResponse,
  GetRepliesResponse,
  GetBookmarkedPostsResponse,
} from "../types/Post";

/**
 * Fetches posts based on the current feed type ("All", "Following", "Trending")
 * and provides a React Query hook (`useGetPosts`) for use in components.
 * Uses Zustand to track the selected feed type and Axios to make authenticated requests.
 */
export const useGetPosts = () => {
  const { feedType } = useFeedTypeStore();
  return useQuery({
    queryKey: ["posts", feedType],
    queryFn: () => axiosService.getPosts(feedType),
  });
};

/**
 * Handles post creation by sending data to the backend and managing UI state updates.
 * Exposes a React Query mutation hook (`useCreatePost`) that:
 * - Sends a new post (text, image, video, or reply) to the backend
 * - Invalidates related queries on success to refresh UI (e.g., posts, likes, bookmarks)
 * - Shows toast notifications on success or error
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<CreatePostResponse, AxiosError, CreatePostData>({
    mutationFn: (postData: CreatePostData) => axiosService.createPost(postData),
    onSuccess: (data) => {
      toast.success(data?.message ?? "Post created!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      queryClient.invalidateQueries({ queryKey: ["liked-posts"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarked-posts"] });
      queryClient.invalidateQueries({ queryKey: ["is-bookmarked"] });
      queryClient.invalidateQueries({ queryKey: ["reply-count"] });
      queryClient.invalidateQueries({ queryKey: ["replies"] });
      queryClient.invalidateQueries({ queryKey: ["is-liked"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: (error: AxiosError) => {
      toast.error(error.message || "Create Post failed!");
    },
  });
};

/**
 * Handles deletion of a post by its ID and manages UI state refresh.
 * Provides a React Query mutation hook (`useDeletePost`) that:
 * - Sends a DELETE request to the backend
 * - Invalidates related queries to reflect the deletion in the UI
 * - Displays toast notifications on success or error
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation<DeletePostResponse, AxiosError, string>({
    mutationFn: (postid: string) => axiosService.deletePost(postid),
    onSuccess: (data) => {
      toast.success(data?.message ?? "Post deleted!");
      const invalidateKeys = [
        "posts",
        "user-posts",
        "liked-posts",
        "bookmarked-posts",
        "is-bookmarked",
        "reply-count",
        "replies",
        "is-liked",
        "post",
      ];

      invalidateKeys.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
    },
    onError: (error) => {
      toast.error(error.message || "Delete Post failed!");
    },
  });
};

/**
 * Handles post editing by sending updated content (text, image, video) to the backend.
 * Exposes a React Query mutation hook (`useEditPost`) that:
 * - Sends a PATCH request to update the post
 * - Invalidates relevant cached queries (e.g., posts list, single post, bookmarks, likes)
 * - Shows toast-like messages on success or failure using `setMessage`
 *
 * The hook accepts an object with `postId` and `postData`, and ensures all dependent
 * components receive the latest state after a successful update.
 */
export const useEditPost = () => {
  const queryClient = useQueryClient();

  return useMutation<
    EditPostResponse,
    AxiosError,
    { postId: string; postData: EditPostData }
  >({
    mutationFn: ({ postId, postData }) =>
      axiosService.editPost(postId, postData),
    onSuccess: (data, variables) => {
      toast.success(data.message ?? "Success");

      const postId = variables.postId;

      const keysToInvalidate = [
        ["posts"],
        ["user-posts"],
        ["liked-posts"],
        ["bookmarked-posts"],
        ["is-bookmarked"],
        ["is-bookmarked", postId],
        ["reply-count"],
        ["reply-count", postId],
        ["replies"],
        ["replies", postId],
        ["is-liked"],
        ["is-liked", postId],
        ["post", postId],
      ];

      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
    onError: (error) => {
      const message =
        (error.response?.data as EditPostResponse)?.message ||
        "Edit Post failed!";
      toast.error(message);
    },
  });
};

/**
 * Handles liking or unliking a post by sending a POST request to the backend.
 * Provides a React Query mutation hook (`useLikeUnlikePost`) that:
 * - Toggles like status for a post
 * - Invalidates multiple related query caches to keep the UI consistent
 * - Displays a toast message if an error occurs
 */
export const useLikeUnlikePost = () => {
  const queryClient = useQueryClient();

  return useMutation<LikeUnlikePostResponse, AxiosError, string>({
    mutationFn: (postId: string) => axiosService.likeUnlikePost(postId),
    onSuccess: (_, postId) => {
      const keysToInvalidate = [
        ["posts"],
        ["post", postId],
        ["is-liked", postId],
        ["is-liked"],
        ["user-posts"],
        ["liked-posts"],
        ["bookmarked-posts"],
        ["is-bookmarked", postId],
        ["is-bookmarked"],
        ["reply-count", postId],
        ["reply-count"],
        ["replies", postId],
        ["replies"],
      ];

      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
    },
    onError: (error) => {
      const message =
        (error.response?.data as LikeUnlikePostResponse)?.message ||
        "Like/Unlike Post failed!";
      toast.error(message ?? "error");
    },
  });
};

/**
 * Checks if the currently logged-in user has liked a specific post.
 * Uses React Query to cache and manage the "liked" state.
 * Automatically refetches on query key change.
 */
export const useIsLiked = (postId: string) => {
  return useQuery<IsLikedResponse, AxiosError>({
    queryKey: ["is-liked", postId],
    queryFn: () => axiosService.isLiked(postId),
    enabled: !!postId, // Avoids running query if postId is undefined
  });
};

/**
 * Fetches a single post by its ID.
 * Useful for post detail pages, modal views, or editing.
 * Automatically caches and refetches using React Query.
 */
export const useGetPostById = (postId: string) => {
  return useQuery<GetPostByIdResponse, AxiosError>({
    queryKey: ["post", postId],
    queryFn: () => axiosService.getPostById(postId),
    enabled: !!postId, // only run if postId is defined
  });
};

/**
 * Handles posting a comment (text/image/video) to a post.
 * Uses React Query mutation to send the request and refreshes relevant data:
 * - Post content
 * - Replies
 * - Like/bookmark state
 * - Reply count
 * Displays success or error messages via `setMessage`.
 */
export const useCommentPost = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CommentPostResponse,
    AxiosError,
    { postId: string; commentData: CreateCommentData }
  >({
    mutationFn: ({ postId, commentData }) =>
      axiosService.commentPost(postId, commentData),
    onSuccess: (data, { postId }) => {
      toast.success(data.message ?? "success");

      const keysToInvalidate = [
        ["posts"],
        ["post", postId],
        ["user-posts"],
        ["liked-posts"],
        ["bookmarked-posts"],
        ["is-bookmarked", postId],
        ["is-bookmarked"],
        ["is-liked", postId],
        ["is-liked"],
        ["reply-count", postId],
        ["reply-count"],
        ["replies", postId],
        ["replies"],
      ];

      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
    },
    onError: (error) => {
      const message =
        (error.response?.data as CommentPostResponse)?.message ||
        "Comment Post failed!";
      toast.error(message ?? "error");
    },
  });
};

/**
 * Fetches all posts created by a specific user by username.
 * Caches and manages state using React Query.
 * Automatically refetches when the `username` changes.
 */
export const useGetUserPosts = (username: string) => {
  return useQuery<GetUserPostsResponse, AxiosError>({
    queryKey: ["user-posts", username],
    queryFn: () => axiosService.getUserPosts(username),
    enabled: !!username, // ensures it only runs when username is defined
  });
};

/*
 * Fetches all posts liked by user sent as an argu
 * Caches and manages state using react query
 */
export const useGetLikedPosts = (username: string) => {
  return useQuery<GetLikedPostsResponse, AxiosError>({
    queryKey: ["liked-posts", username],
    queryFn: () => axiosService.getLikedPosts(username),
  });
};

/**
 * Adds or removes a bookmark on a post.
 * Uses React Query mutation and invalidates all related cache keys to ensure consistent UI.
 * Displays toast success/error notifications.
 */
export const useBookmarkPost = () => {
  const queryClient = useQueryClient();

  return useMutation<BookmarkPostResponse, AxiosError, string>({
    mutationFn: (postId) => axiosService.bookmarkPost(postId),
    onSuccess: (data, postId) => {
      toast.success(data.message ?? "Success");

      const keysToInvalidate = [
        ["posts"],
        ["post", postId],
        ["is-bookmarked", postId],
        ["is-bookmarked"],
        ["user-posts"],
        ["liked-posts"],
        ["bookmarked-posts"],
        ["is-liked", postId],
        ["is-liked"],
        ["reply-count", postId],
        ["reply-count"],
        ["replies", postId],
        ["replies"],
      ];

      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
    },
    onError: (error) => {
      const message =
        (error.response?.data as BookmarkPostResponse)?.message ||
        "Bookmark Post failed!";
      toast.error(message);
    },
  });
};

/**
 * Checks if a specific post is bookmarked by the currently logged-in user.
 * Caches the result using React Query and automatically refetches when `postId` changes.
 */
export const useIsBookmarked = (postId: string) => {
  return useQuery<IsBookmarkedResponse, AxiosError>({
    queryKey: ["is-bookmarked", postId],
    queryFn: () => axiosService.isBookmarked(postId),
    enabled: !!postId, // Only run when postId is defined
  });
};

/**
 * Fetches all bookmarked posts for the currently logged-in user.
 */
export const useGetBookmarkedPosts = () => {
  return useQuery<GetBookmarkedPostsResponse, AxiosError>({
    queryKey: ["bookmarked-posts"],
    queryFn: () => axiosService.getBookmarkedPosts(),
  });
};

/**
 * Creates a new reply to an existing post.
 * Invalidates related queries to keep UI synchronized.
 */
export const useCreateReply = () => {
  const queryClient = useQueryClient();
  return useMutation<
    CreatePostResponse,
    AxiosError,
    { postData: CreatePostData; parentId: string }
  >({
    mutationFn: ({ postData, parentId }) => {
      return axiosService.createPost({
        ...postData,
        parentId,
      });
    },
    onSuccess: (data: CreatePostResponse, variables) => {
      toast.success(data.message ?? "Success");
      // Invalidate all related queries to keep UI in sync
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", variables.parentId] });
      queryClient.invalidateQueries({
        queryKey: ["replies", variables.parentId],
      });
      queryClient.invalidateQueries({ queryKey: ["replies"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      queryClient.invalidateQueries({ queryKey: ["liked-posts"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarked-posts"] });
      queryClient.invalidateQueries({
        queryKey: ["is-bookmarked", variables.parentId],
      });
      queryClient.invalidateQueries({ queryKey: ["is-bookmarked"] });
      queryClient.invalidateQueries({
        queryKey: ["is-liked", variables.parentId],
      });
      queryClient.invalidateQueries({ queryKey: ["is-liked"] });
      queryClient.invalidateQueries({
        queryKey: ["reply-count", variables.parentId],
      });
      queryClient.invalidateQueries({ queryKey: ["reply-count"] });
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as CreatePostResponse)?.message ||
        "Failed to create reply!";
      toast.error(message);
    },
  });
};

/**
 * Fetches all replies for a specific post.
 */
export const useGetReplies = (postId: string) => {
  return useQuery<GetRepliesResponse, AxiosError>({
    queryKey: ["replies", postId],
    queryFn: () => axiosService.getReplies(postId),
    enabled: !!postId, // Only run when postId exists
  });
};

/**
 * Fetches the number of replies on a specific post.
 * Caches the result using React Query and automatically refetches when `postId` changes.
 */
export const useGetReplyCount = (postId: string) => {
  return useQuery<GetReplyCountResponse, AxiosError>({
    queryKey: ["reply-count", postId],
    queryFn: () => axiosService.getReplyCount(postId),
    enabled: !!postId, // Only run when postId is defined
  });
};

/*
 * Fetches the parent thread
 */
export const useGetParentThread = (postId: string) => {
  return useQuery<GetParentThreadResponse, AxiosError>({
    queryKey: ["parent-thread", postId],
    queryFn: () => axiosService.getParentThread(postId),
    enabled: !!postId,
  });
};
