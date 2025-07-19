import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

type props = {
  onClose: () => void;
  onClick: () => void;
  actionText: string;
  mainheading: string;
  subheading?: string;
  isPending: boolean;
  isPendingText?: string;
};
export default function WarningModel({
  onClose,
  onClick,
  mainheading,
  subheading,
  isPending,
  isPendingText,
  actionText,
}: props) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-zinc-900 rounded-lg p-4 max-w-md w-full mx-2 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{mainheading}</h2>
        </div>
        <p className="text-zinc-400">
          {subheading ?? "Are you sure you want to proceed?"}
        </p>
        <div className="flex justify-end gap-4">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            variant={"secondary"}
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            disabled={isPending}
            variant={"destructive"}
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="size-5 animate-spin" />
                {isPendingText ? <span>{isPendingText}</span> : <></>}
              </div>
            ) : (
              actionText
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
