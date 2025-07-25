"use client";

import MenuButton from "@/layout/MenuButton";
import { useGetBookmarkedPosts } from "@/hooks/usePost";
import { Loader2 } from "lucide-react";

const Header = () => {
  const { data: bookmarks, isLoading } = useGetBookmarkedPosts();
  return (
    <div className="flex w-full select-none justify-between items-center border-b h-[60px] border-zinc-700 sticky top-0 bg-black px-4 z-10">
      <div className=" flex items-center gap-4 ">
        <MenuButton />
        <h1 className="font-semibold opacity-95">Bookmarks</h1>
      </div>
      <div className="border border-zinc-700 text-zinc-200 bg-zinc-800 rounded-xl px-4 py-1">
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          `${bookmarks?.posts?.length} Posts`
        )}
      </div>
    </div>
  );
};

export default Header;
