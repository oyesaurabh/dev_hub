import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetMeResponse, LogoutResponse } from "@/types/User";
import { axiosService } from "@/services";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

//will get the info of currently loggedin user
export const useGetMe = () => {
  return useQuery<GetMeResponse, AxiosError>({
    queryKey: ["me"],
    queryFn: () => axiosService.getMe(),
    retry: false,
  });
};

//will logout the user
export const useLogout = () => {
  const router = useRouter();
  return useMutation<LogoutResponse, AxiosError, void>({
    mutationFn: () => axiosService.logout(),
    onSuccess: (data: LogoutResponse) => {
      toast.success(data.message);
      router.push("/login");
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as LogoutResponse)?.message || "Logout failed!";
      toast.error(message);
    },
  });
};
