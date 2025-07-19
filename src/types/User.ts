import { z } from "zod";

const userSchema = z.lazy(() =>
  z.object({
    _id: z.string(),
    fullName: z.string(),
    username: z.string(),
    email: z.string(),
    profileImg: z.string(),
    coverImg: z.string(),
    bio: z.string(),
    link: z.string(),
    likedPosts: z.array(z.string()),
    isVerified: z.boolean(),
    location: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    followers: z.array(z.string()),
    followings: z.array(z.string()),
  })
);

export type User = z.infer<typeof userSchema>;
export { userSchema };

export interface GetMeResponse {
  message: string;
  user: User;
}
export interface SuggestedUsersResponse {
  message: string;
  users: User[];
}
export interface FollowUnfollowUserResponse {
  message: string;
}
export interface IsFollowingResponse {
  message: string;
  isFollowing: boolean;
}
export interface UserProfileResponse {
  message: string;
  user: User;
}
export interface UpdateUserProfileResponse {
  message: string;
}
export interface UpdateUserProfileData {
  fullName?: string;
  username?: string;
  currentPassword?: string;
  newPassword?: string;
  bio?: string;
  link?: string;
  location?: string;
  profileImg?: string;
  coverImg?: string;
}
export interface GetFollowersResponse {
  message: string;
  followers: User[];
}
export interface GetFollowsYouResponse {
  message: string;
  followsYou: boolean;
}
export interface GetFollowingResponse {
  message: string;
  followings: User[];
}
export interface LogoutResponse {
  message: string;
}
