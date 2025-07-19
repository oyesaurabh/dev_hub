import { CreateFeedbackResponse, FeedbackInput } from "@/types/Feedback";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosService } from "@/services";
import { toast } from "sonner";

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateFeedbackResponse, AxiosError, FeedbackInput>({
    mutationFn: (feedback: FeedbackInput) =>
      axiosService.createFeedback(feedback),
    onSuccess: (data: CreateFeedbackResponse) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      queryClient.invalidateQueries({ queryKey: ["all-feedbacks"] });
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as CreateFeedbackResponse)?.message ||
        "Create feedback failed!";
      toast.error(message);
    },
  });
};

export const useGetFeedbacks = () => {
  return useQuery({
    queryKey: ["all-feedbacks"],
    queryFn: () => axiosService.getFeedbacks(),
  });
};
