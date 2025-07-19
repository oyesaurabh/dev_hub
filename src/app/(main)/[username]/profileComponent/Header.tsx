"use client";
import Link from "next/link";
import { useGetMe } from "@/hooks/useAuth";
import { useGetUserProfile } from "@/hooks/useUser";
import { ArrowLeft, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const Header = () => {
  const router = useRouter();
  const { username } = useParams();
  const { data: authUser } = useGetMe();
  const { data: user } = useGetUserProfile(username as string);
  const owner = authUser?.user._id === user?.user._id;

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex sticky top-0 z-50 bg-black items-center justify-between border-b border-zinc-700 h-[60px] px-4">
      <div className=" flex items-center gap-3">
        <Button onClick={handleBack} variant={"ghost"}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="font-semibold">Profile</h1>
      </div>
      {owner && (
        <Button variant={"secondary"}>
          <Link href="/settings/profile" className="flex items-center gap-2">
            <PencilLine size={16} />
            Edit Profile
          </Link>
        </Button>
      )}
    </div>
  );
};

export default Header;
