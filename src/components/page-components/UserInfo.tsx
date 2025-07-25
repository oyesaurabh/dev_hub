import {
  useFollowUnfollowUser,
  useGetFollowsYou,
  useIsFollowing,
} from "@/hooks/useUser";
import Image from "next/image";
import React from "react";
import { User } from "@/types/User";
import { useGetMe } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import FollowsYou from "./FollowsYou";
import VerifiedBadge from "./VerifiedBadge";
import { Button } from "../ui/button";

const UserInfo = ({ user }: { user: User }) => {
  const router = useRouter();
  const { data: followingState, isLoading: isFollowingLoading } =
    useIsFollowing(user._id || "");
  const { mutate: followUnfollowUser, isPending: isFollowUnfollowPending } =
    useFollowUnfollowUser();
  const { data: followsYou } = useGetFollowsYou(user._id || "");
  const { data: authUser } = useGetMe();
  const isLoading = isFollowUnfollowPending || isFollowingLoading;
  const handleFollowUnfollowUser = () => {
    followUnfollowUser(user._id);
  };
  console.log(user);
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <Image
            src={user?.profileImg || "/img/pfp/default.webp"}
            alt={user?.username || "default"}
            width={50}
            height={50}
            className="size-11 rounded-xl cursor-pointer select-none object-cover hover:brightness-90 bg-white transition-all duration-200"
            onClick={() => router.push(`/${user.username}`)}
          />
          <div>
            <div className="flex flex-row items-center gap-1">
              <div
                onClick={() => router.push(`/${user.username}`)}
                className="font-semibold cursor-pointer hover:underline"
              >
                {user.fullName || "Deleted User"}
              </div>
              {user?.isVerified && <VerifiedBadge />}
            </div>
            <div className="flex items-center gap-1">
              <p className="text-sm text-zinc-400">
                @{user.username || "DeletedUser"}
              </p>
              {followsYou?.followsYou && <FollowsYou />}
            </div>
          </div>
        </div>
        <div className="flex items-center pl-4 select-none">
          {authUser?.user._id !== user._id && (
            <Button onClick={handleFollowUnfollowUser} variant={"ghost"}>
              {followingState?.isFollowing ? (
                <div>
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={22} />
                  ) : (
                    "Following"
                  )}
                </div>
              ) : (
                <div>
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={22} />
                  ) : (
                    "Follow"
                  )}
                </div>
              )}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default UserInfo;
