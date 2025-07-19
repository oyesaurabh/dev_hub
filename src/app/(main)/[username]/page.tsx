"use client";
import Header from "./profileComponent/Header";
import Image from "next/image";
import { Calendar, Link, Loader2, MapPin, X } from "lucide-react";
import {
  useFollowUnfollowUser,
  useGetFollowsYou,
  useGetUserProfile,
  useIsFollowing,
} from "@/hooks/useUser";
import { useParams } from "next/navigation";
import { useGetMe } from "@/hooks/useAuth";
import GetUserPost from "./profileComponent/GetUserPost";
import GetLikedPost from "./profileComponent/GetLikedPost";
import { useState } from "react";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import NoUser from "@/components/not-available/NoUser";
import GetUsersList from "./profileComponent/GetUsersList";
import FollowsYou from "@/components/page-components/FollowsYou";
import PageHead from "@/components/page-components/Pagehead";
import { Button } from "@/components/ui/button";
import VerifiedBadge from "@/components/page-components/VerifiedBadge";

const UserProfile = () => {
  const { username } = useParams();
  const [response, setResponse] = useState<string>("user-posts");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isCoverImageModalOpen, setIsCoverImageModalOpen] = useState(false);
  const { data, isLoading, isError } = useGetUserProfile(username as string);
  const { data: authUser } = useGetMe();
  const { mutate: followUnfollowUser, isPending: isFollowUnfollowPending } =
    useFollowUnfollowUser();
  const { data: followsYou } = useGetFollowsYou(data?.user._id || "");
  const [isUsersListOpen, setIsUsersListOpen] = useState(false);
  const [userType, setUserType] = useState<"followers" | "following">(
    "followers"
  );
  const { data: isFollowing } = useIsFollowing(data?.user._id || "");
  const user = data?.user;
  const owner = authUser?.user._id === user?._id;
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  };
  const handleFollowUnfollow = () => {
    followUnfollowUser(user?._id || "");
  };
  const formatLink = (link: string) => {
    if (link.startsWith("https://")) {
      return link.slice(8);
    }
    if (link.startsWith("http://")) {
      return link.slice(7);
    }
    return link;
  };

  return (
    <>
      <PageHead title={`${user?.username} | Devhub`} />
      <div>
        <Header />
        {isLoading ? (
          <ProfileSkeleton />
        ) : isError ? (
          <NoUser />
        ) : (
          <>
            <div className="rounded-xl relative mb-[60px] select-none">
              <Image
                src={user?.coverImg || ""}
                className="w-full h-[160px] md:h-[200px] object-cover bg-white cursor-pointer hover:brightness-90 transition-all duration-200"
                alt="profile"
                width={1000}
                height={1000}
                onClick={() => setIsCoverImageModalOpen(true)}
              />
              <Image
                src={user?.profileImg || ""}
                className="absolute -bottom-[60px] bg-white left-5 size-[120px] object-cover rounded-xl border-4 border-black cursor-pointer hover:brightness-90 transition-all duration-200"
                alt="profile"
                width={1000}
                height={1000}
                onClick={() => setIsImageModalOpen(true)}
              />
              {!owner && (
                <>
                  {isFollowing?.isFollowing ? (
                    <Button
                      onClick={handleFollowUnfollow}
                      className="absolute -bottom-[50px] right-5 bg-zinc-800 text-white font-semibold hover:bg-zinc-700 transition-all duration-200 px-4 py-1.5 rounded-xl"
                    >
                      {isFollowUnfollowPending ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Following"
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleFollowUnfollow}
                      className="absolute -bottom-[50px] right-5 bg-primary text-white font-semibold hover:bg-primary/80 transition-all duration-200 px-4 py-1.5 rounded-xl"
                    >
                      {isFollowUnfollowPending ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Follow"
                      )}
                    </Button>
                  )}
                </>
              )}
            </div>
            <div className="px-5 py-3 flex flex-col gap-2.5">
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <h1 className="text-2xl font-semibold">{user?.fullName}</h1>
                  {user?.isVerified && <VerifiedBadge />}
                </div>

                <div className="flex gap-2 items-center">
                  <p className="text-sm text-zinc-400 -mt-0.5">
                    @{user?.username}
                  </p>
                  {followsYou?.followsYou && <FollowsYou />}
                </div>
              </div>
              <p className="">{user?.bio}</p>
              <div className="flex flex-wrap gap-3 items-center text-sm text-zinc-400">
                <div className="flex gap-1 items-center">
                  <MapPin size={14} /> {user?.location}
                </div>
                {user?.link && (
                  <div className="flex gap-1 items-center">
                    <Link size={14} />{" "}
                    <a
                      href={`https://${formatLink(user?.link || "")}`}
                      target="_blank"
                      className="text-blue-500 hover:underline"
                      rel="noopener noreferrer"
                    >
                      {formatLink(user?.link || "")}
                    </a>
                  </div>
                )}
                <div className="flex gap-1 items-center">
                  <Calendar size={14} /> Joined{" "}
                  {formatDate(user?.createdAt || "")}
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <Button
                  onClick={() => {
                    setUserType("following");
                    setIsUsersListOpen(true);
                  }}
                  variant={"ghost"}
                >
                  <span>{user?.followings.length}</span>{" "}
                  <span className="text-zinc-400">Following</span>
                </Button>
                <Button
                  onClick={() => {
                    setUserType("followers");
                    setIsUsersListOpen(true);
                  }}
                  variant={"ghost"}
                >
                  <span>{user?.followers.length}</span>{" "}
                  <span className="text-zinc-400">Followers</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center mt-3  py-2.5 border-b border-zinc-700">
              <div className="flex border items-center rounded-xl w-fit border-zinc-700 select-none">
                <Button
                  onClick={() => setResponse("user-posts")}
                  variant={response === "user-posts" ? "secondary" : "ghost"}
                >
                  Posts
                </Button>
                <Button
                  onClick={() => setResponse("liked-posts")}
                  variant={response === "liked-posts" ? "secondary" : "ghost"}
                >
                  Likes
                </Button>
              </div>
            </div>
            {response === "user-posts" && <GetUserPost />}
            {response === "liked-posts" && <GetLikedPost />}
          </>
        )}
      </div>

      {isImageModalOpen && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsImageModalOpen(false);
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[10000]"
        >
          <div className="rounded-xl flex justify-center items-center">
            <Image
              src={user?.profileImg || ""}
              alt="Profile image"
              width={800}
              height={800}
              quality={100}
              className="rounded-xl w-[400px] h-[400px] select-none bg-white object-cover"
            />
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsImageModalOpen(false);
            }}
            className="absolute top-4 right-4 text-white hover:bg-zinc-700/50 rounded-xl p-2 transition-all duration-200"
          >
            <X />
          </Button>
        </div>
      )}
      {isCoverImageModalOpen && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsCoverImageModalOpen(false);
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[10000]"
        >
          <div className="w-[95%] h-[600px] rounded-xl flex justify-center items-center">
            <Image
              src={user?.coverImg || ""}
              alt="Cover image"
              width={1920}
              height={1080}
              className="rounded-xl max-w-full select-none bg-white max-h-full object-cover"
            />
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsCoverImageModalOpen(false);
            }}
            className="absolute top-4 right-4 text-white hover:bg-zinc-700/50 rounded-xl p-2 transition-all duration-200"
          >
            <X />
          </Button>
        </div>
      )}
      {user && (
        <GetUsersList
          user={user}
          type={userType}
          isOpen={isUsersListOpen}
          onClose={() => setIsUsersListOpen(false)}
        />
      )}
    </>
  );
};

export default UserProfile;
