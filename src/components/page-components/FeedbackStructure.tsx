import { Feedback } from "@/types/Feedback";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import VerifiedBadge from "./VerifiedBadge";

const FeedbackStructure = ({ feedback }: { feedback: Feedback }) => {
  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleString("en-US", options);
  };
  const router = useRouter();

  const userProfile = () => {
    router.push(`/${feedback?.user?.username}`);
  };
  return (
    <div className="bg-gray-700/40 p-4 rounded-md">
      <div className="flex items-center gap-2 mb-3">
        <Image
          width={40}
          height={40}
          onClick={userProfile}
          src={feedback?.user?.profileImg || "/img/pfp/default.webp"}
          alt={feedback?.user?.fullName || "Deleted User"}
          className="w-10 h-10 rounded-xl hover:brightness-90 cursor-pointer transition-all duration-200"
        />
        <div>
          <div className="flex items-center gap-1">
            <h3
              onClick={userProfile}
              className="font-semibold hover:underline cursor-pointer"
            >
              {feedback?.user?.fullName || "Deleted User"}
            </h3>
            {feedback?.user?.isVerified && <VerifiedBadge />}
          </div>
          <p className="text-sm text-gray-400">
            {formatDateTime(feedback?.createdAt)}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-1">{feedback?.title}</h2>
      <p className="text-gray-300">{feedback?.description}</p>
    </div>
  );
};

export default FeedbackStructure;
