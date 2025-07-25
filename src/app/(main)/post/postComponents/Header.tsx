"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = ({ title }: { title: string }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex w-full select-none items-center border-b h-[60px] border-zinc-700 sticky top-0 bg-black px-4 z-[20]">
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-zinc-800 rounded-xl w-fit cursor-pointer opacity-95"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-semibold opacity-95">{title}</h1>
      </div>
    </div>
  );
};

export default Header;
