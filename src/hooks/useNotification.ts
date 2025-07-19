import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  DeleteAllNotificationsResponse,
  DeleteNotificationResponse,
  GetNotificationsResponse,
  GetUnreadNotificationsCountResponse,
} from "@/types/Notification";
import { axiosService } from "@/services";
import { toast } from "sonner";

export const useGetNotifications = () => {
  return useQuery<GetNotificationsResponse, AxiosError>({
    queryKey: ["notifications"],
    queryFn: () => axiosService.getNotifications(),
  });
};

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation<DeleteAllNotificationsResponse, AxiosError>({
    mutationFn: () => axiosService.deleteAllNotifications(),
    onSuccess: (data: DeleteAllNotificationsResponse) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["unread-notifications-count"],
      });
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as DeleteAllNotificationsResponse)?.message ||
        "Failed to delete all notifications!";
      toast.error(message);
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation<DeleteNotificationResponse, AxiosError, string>({
    mutationFn: (notificationId: string) =>
      axiosService.deleteNotification(notificationId),
    onSuccess: (data: DeleteNotificationResponse) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["unread-notifications-count"],
      });
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as DeleteNotificationResponse)?.message ||
        "Failed to delete notification!";
      toast.error(message);
    },
  });
};

export const useGetUnreadNotificationsCount = () => {
  return useQuery<GetUnreadNotificationsCountResponse, AxiosError>({
    queryKey: ["unread-notifications-count"],
    queryFn: () => axiosService.getUnreadNotificationsCount(),
  });
};
