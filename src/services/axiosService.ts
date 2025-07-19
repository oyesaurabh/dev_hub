import config from "@/config/config";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  CreatePostResponse,
  CreatePostData,
  GetPostsResponse,
  DeletePostResponse,
  EditPostData,
  EditPostResponse,
  LikeUnlikePostResponse,
  IsLikedResponse,
  GetPostByIdResponse,
  CreateCommentData,
  CommentPostResponse,
  GetUserPostsResponse,
  BookmarkPostResponse,
  IsBookmarkedResponse,
  GetReplyCountResponse,
  GetLikedPostsResponse,
  GetParentThreadResponse,
  GetRepliesResponse,
  GetBookmarkedPostsResponse,
} from "@/types/Post";
import {
  GetFollowersResponse,
  GetFollowingResponse,
  GetFollowsYouResponse,
  GetMeResponse,
  SuggestedUsersResponse,
  UpdateUserProfileData,
  User,
} from "@/types/User";
import {
  DeleteAllNotificationsResponse,
  DeleteNotificationResponse,
  GetNotificationsResponse,
  GetUnreadNotificationsCountResponse,
} from "@/types/Notification";
import {
  CreateFeedbackResponse,
  FeedbackInput,
  GetFeedbacksResponse,
} from "@/types/Feedback";

const api: AxiosInstance = axios.create({
  baseURL: config.backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Generic error handler wrapper
const handleApiCall = async <T>(
  apiCall: () => Promise<AxiosResponse<T>>
): Promise<T> => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Something went wrong";
    throw new Error(errorMessage);
  }
};

class AxiosService {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  //auth
  getMe(): Promise<GetMeResponse> {
    return handleApiCall(() => this.api.get("/auth/get-me"));
  }
  isAuth(): Promise<any> {
    return handleApiCall(() => this.api.get("/auth/is-authorized"));
  }
  sendOtp(payload: any): Promise<any> {
    return handleApiCall(() => this.api.post("/auth/send-otp", payload));
  }
  verifyandsignup(payload: any): Promise<any> {
    return handleApiCall(() =>
      this.api.post("/auth/verify-and-register", payload)
    );
  }
  login(payload: any): Promise<any> {
    return handleApiCall(() => this.api.post("/auth/login", payload));
  }
  logout(): Promise<any> {
    return handleApiCall(() => this.api.post("/auth/logout"));
  }

  //post
  getPosts(feedType: string): Promise<GetPostsResponse> {
    const endpoint =
      {
        All: "/post/all-posts",
        Following: "/post/following-posts",
        Trending: "/post/trending-posts",
      }[feedType] || "/post/all-posts";

    return handleApiCall(() => this.api.get(endpoint));
  }
  createPost(payload: CreatePostData): Promise<CreatePostResponse> {
    return handleApiCall(() => this.api.post("/post/create-post", payload));
  }
  deletePost(postId: string): Promise<DeletePostResponse> {
    return handleApiCall(() => this.api.delete(`/post/delete-post/${postId}`));
  }
  editPost(postId: string, postData: EditPostData): Promise<EditPostResponse> {
    return handleApiCall(() =>
      this.api.patch(`/post/edit-post/${postId}`, postData)
    );
  }
  likeUnlikePost(postId: string): Promise<LikeUnlikePostResponse> {
    return handleApiCall(() => this.api.post(`/post/like-post/${postId}`));
  }
  isLiked(postId: string): Promise<IsLikedResponse> {
    return handleApiCall(() => this.api.get(`/post/is-liked/${postId}`));
  }
  getPostById(postId: string): Promise<GetPostByIdResponse> {
    return handleApiCall(() => this.api.get(`/post/post/${postId}`));
  }
  commentPost(
    postId: string,
    commentData: CreateCommentData
  ): Promise<CommentPostResponse> {
    return handleApiCall(() =>
      this.api.post(`/post/comment-post/${postId}`, commentData)
    );
  }
  getUserPosts(username: string): Promise<GetUserPostsResponse> {
    return handleApiCall(() => this.api.get(`/post/user-posts/${username}`));
  }

  bookmarkPost(postId: string): Promise<BookmarkPostResponse> {
    return handleApiCall(() => this.api.post(`/post/bookmark-post/${postId}`));
  }
  isBookmarked(postId: string): Promise<IsBookmarkedResponse> {
    return handleApiCall(() => this.api.get(`/post/is-bookmarked/${postId}`));
  }
  getReplyCount(postId: string): Promise<GetReplyCountResponse> {
    return handleApiCall(() => this.api.get(`/post/reply-count/${postId}`));
  }
  getLikedPosts(username: string): Promise<GetLikedPostsResponse> {
    return handleApiCall(() => this.api.get(`/post/liked-posts/${username}`));
  }
  getParentThread(postId: string): Promise<GetParentThreadResponse> {
    return handleApiCall(() => this.api.get(`/post/parent-thread/${postId}`));
  }
  getReplies(postId: string): Promise<GetRepliesResponse> {
    return handleApiCall(() => this.api.get(`/post/replies/${postId}`));
  }
  getBookmarkedPosts(): Promise<GetBookmarkedPostsResponse> {
    return handleApiCall(() => this.api.get("/post/bookmarked-posts"));
  }

  //notifications
  getNotifications(): Promise<GetNotificationsResponse> {
    return handleApiCall(() => this.api.get("/notification"));
  }
  deleteAllNotifications(): Promise<DeleteAllNotificationsResponse> {
    return handleApiCall(() => this.api.delete("/notification/delete-all"));
  }
  deleteNotification(
    notificationId: string
  ): Promise<DeleteNotificationResponse> {
    return handleApiCall(() =>
      this.api.delete(`/notification/${notificationId}`)
    );
  }
  getUnreadNotificationsCount(): Promise<GetUnreadNotificationsCountResponse> {
    return handleApiCall(() => this.api.get("/notification/unread-count"));
  }

  //feedback
  createFeedback(feedback: FeedbackInput): Promise<CreateFeedbackResponse> {
    return handleApiCall(() =>
      this.api.post<CreateFeedbackResponse>(
        "/feedback/create-feedback",
        feedback
      )
    );
  }
  getFeedbacks(): Promise<GetFeedbacksResponse> {
    return handleApiCall(() => this.api.get("/feedback/all-feedbacks"));
  }

  //users
  getSuggestedUsers(): Promise<SuggestedUsersResponse> {
    return handleApiCall(() => this.api.get("/user/suggested"));
  }
  followUnfollowUser(userId: string): Promise<{ message: string }> {
    return handleApiCall(() =>
      this.api.post<{ message: string }>(`/user/follow/${userId}`)
    );
  }
  isFollowing(
    userId: string
  ): Promise<{ message: string; isFollowing: boolean }> {
    return handleApiCall(() =>
      this.api.get<{ message: string; isFollowing: boolean }>(
        `/user/is-following/${userId}`
      )
    );
  }
  getUserProfile(username: string): Promise<{ message: string; user: User }> {
    return handleApiCall(() =>
      this.api.get<{ message: string; user: User }>(`/user/profile/${username}`)
    );
  }
  updateUserProfile(
    profileData: UpdateUserProfileData
  ): Promise<{ message: string }> {
    return handleApiCall(() =>
      this.api.patch<{ message: string }>("/user/update-profile", profileData)
    );
  }
  getFollowers(username: string): Promise<GetFollowersResponse> {
    return handleApiCall(() => this.api.get(`/user/followers/${username}`));
  }
  getFollowsYou(userId: string): Promise<GetFollowsYouResponse> {
    return handleApiCall(() => this.api.get(`/user/follows-you/${userId}`));
  }
  getFollowing(username: string): Promise<GetFollowingResponse> {
    return handleApiCall(() => this.api.get(`/user/followings/${username}`));
  }
}

const axiosService = new AxiosService(api);
export default axiosService;
