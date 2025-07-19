import { z } from "zod";
import { userSchema } from "./User";
import { postSchema } from "./Post";
export const notificationSchema = z.object({
  _id: z.string(),
  from: userSchema,
  to: userSchema,
  type: z.string(),
  read: z.boolean(),
  post: postSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Notification = z.infer<typeof notificationSchema>;

export interface GetNotificationsResponse {
  message: string;
  notifications: Notification[];
}
export interface DeleteAllNotificationsResponse {
  message: string;
}
export interface DeleteNotificationResponse {
  message: string;
}
export interface GetUnreadNotificationsCountResponse {
  message: string;
  count: number;
}
