"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MenuButton from "@/layout/MenuButton";
import useFeedTypeStore from "@/store/FeedTypeStore";
import { Hash } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const HomeHeader = () => {
  const [activeTab, setActiveTab] = useState<"All" | "Trending" | "Following">(
    "All"
  );
  const { setFeedType } = useFeedTypeStore();
  useEffect(() => {
    setFeedType(activeTab);
  }, [activeTab, setFeedType]);

  return (
    <div className="flex w-full select-none justify-between items-center border-b border-zinc-700 sticky top-0 bg-black h-[60px] px-4 z-10">
      <p></p>
      <MenuButton />
      <div className="flex items-center border border-zinc-700  rounded-xl my-2.5">
        <div
          onClick={() => setActiveTab("All")}
          className={`flex flex-1 justify-center items-center text-xs rounded-l-xl font-semibold px-3 py-2 cursor-pointer transition-colors duration-200 ${
            activeTab === "All" ? "bg-zinc-800" : "hover:bg-zinc-800"
          }`}
        >
          Newest
        </div>
        <div
          onClick={() => setActiveTab("Trending")}
          className={`flex flex-1 justify-center items-center text-xs border-x border-zinc-700 font-semibold px-3 py-2 cursor-pointer transition-colors duration-200 ${
            activeTab === "Trending" ? "bg-zinc-800" : "hover:bg-zinc-800"
          }`}
        >
          Trending
        </div>
        <div
          onClick={() => setActiveTab("Following")}
          className={`flex flex-1 justify-center items-center text-xs rounded-r-xl font-semibold px-3 py-2 cursor-pointer transition-colors duration-200 ${
            activeTab === "Following" ? "bg-zinc-800" : "hover:bg-zinc-800"
          }`}
        >
          Following
        </div>
      </div>
      <Tooltip>
        <TooltipTrigger>
          <Link href="/feedback">
            <div className="p-2 hover:bg-zinc-800 rounded-xl w-fit cursor-pointer opacity-95">
              <Hash size={20} />
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Feedbacks</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default HomeHeader;
