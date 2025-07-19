import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  FollowUnfollowUserResponse,
  GetFollowersResponse,
  GetFollowingResponse,
  GetFollowsYouResponse,
  IsFollowingResponse,
  SuggestedUsersResponse,
  UpdateUserProfileData,
  UpdateUserProfileResponse,
  UserProfileResponse,
} from "@/types/User";
import { toast } from "sonner";
import { axiosService } from "@/services";

export const useGetSuggestedUsers = () => {
  return useQuery<SuggestedUsersResponse, AxiosError>({
    queryKey: ["suggested-users"],
    queryFn: () => axiosService.getSuggestedUsers(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useFollowUnfollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation<FollowUnfollowUserResponse, AxiosError, string>({
    mutationFn: (userId: string) => axiosService.followUnfollowUser(userId),
    onSuccess: (data: FollowUnfollowUserResponse) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["is-following"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      queryClient.invalidateQueries({ queryKey: ["followings"] });
      queryClient.invalidateQueries({ queryKey: ["follows-you"] });
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as FollowUnfollowUserResponse)?.message ||
        "Failed to follow user";
      toast.error(message);
    },
  });
};

export const useIsFollowing = (userId: string) => {
  return useQuery<IsFollowingResponse, AxiosError>({
    queryKey: ["is-following", userId],
    queryFn: () => axiosService.isFollowing(userId),
    enabled: !!userId,
  });
};

export const useGetUserProfile = (username: string) => {
  return useQuery<UserProfileResponse, AxiosError>({
    queryKey: ["user-profile", username],
    queryFn: () => axiosService.getUserProfile(username),
    enabled: !!username,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<
    UpdateUserProfileResponse,
    AxiosError,
    UpdateUserProfileData
  >({
    mutationFn: (profileData: UpdateUserProfileData) =>
      axiosService.updateUserProfile(profileData),
    onSuccess: (data: UpdateUserProfileResponse) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as UpdateUserProfileResponse)?.message ||
        "Failed to update profile";
      toast.error(message);
    },
  });
};

export const useGetFollowers = (username: string) => {
  return useQuery<GetFollowersResponse, AxiosError>({
    queryKey: ["followers", username],
    queryFn: () => axiosService.getFollowers(username),
    enabled: !!username,
  });
};

export const useGetFollowing = (username: string) => {
  return useQuery<GetFollowingResponse, AxiosError>({
    queryKey: ["followings", username],
    queryFn: () => axiosService.getFollowing(username),
    enabled: !!username,
  });
};

export const useGetFollowsYou = (userId: string) => {
  return useQuery<GetFollowsYouResponse, AxiosError>({
    queryKey: ["follows-you", userId],
    queryFn: () => axiosService.getFollowsYou(userId),
    enabled: !!userId,
  });
};
