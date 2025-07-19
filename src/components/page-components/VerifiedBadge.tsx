import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

export default function VerifiedBadge() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center justify-center">
          <Image
            src="/img/icon/badge.png"
            alt="verifiedlogo"
            width={20}
            height={20}
            className="bg-black size-[20px] select-none"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>Verified</TooltipContent>
    </Tooltip>
  );
}
