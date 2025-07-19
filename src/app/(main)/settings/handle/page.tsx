"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AtSign, Check, Info, LoaderCircle, UserRound } from "lucide-react";
import Header from "@/components/page-components/SettingHeader";
import { useGetMe } from "@/hooks/useAuth";
import { useUpdateUserProfile } from "@/hooks/useUser";
import PageHead from "@/components/page-components/Pagehead";
import { Button } from "@/components/ui/button";

const HandlePage = () => {
  const router = useRouter();
  const { data: authUser } = useGetMe();
  const { mutate: updateUserProfile, isPending: isUpdating } =
    useUpdateUserProfile();

  const [username, setUsername] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const [error, setError] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (authUser?.user) {
      setUsername(authUser.user.username);
      setOriginalUsername(authUser.user.username);
    }
  }, [authUser]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "");
    setUsername(value);
    setError("");
    setIsAvailable(false);
  };

  const checkUsernameAvailability = async () => {
    if (!username) {
      setError("Username cannot be empty");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (username === originalUsername) {
      setIsAvailable(true);
      return;
    }

    setIsChecking(true);
    // Simulating API call to check username availability
    setTimeout(() => {
      // In a real app, this would be an actual API call
      const randomAvailable = Math.random() > 0.3;
      setIsAvailable(randomAvailable);
      if (!randomAvailable) {
        setError("This username is already taken");
      }
      setIsChecking(false);
    }, 800);
  };

  const updateUsername = () => {
    if (!isAvailable) {
      checkUsernameAvailability();
      return;
    }

    updateUserProfile(
      { username },
      {
        onSuccess: () => {
          router.push(`/${username}`);
        },
      }
    );
  };

  return (
    <>
      <PageHead title="Handle | Devhub" />
      <Header title="Username" />

      <div className="flex flex-col px-6 py-4">
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-2">Update your username</h2>
          <p className="text-zinc-400 text-sm">
            Your @username is unique and appears in your profile URL. It helps
            people find and mention you.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Username</label>
            <div
              className={`flex flex-row border rounded-xl gap-3 py-2 px-4 ${
                error
                  ? "border-red-500"
                  : "border-zinc-500 focus-within:border-primary"
              } transition-colors duration-200`}
            >
              <AtSign size={20} className="text-zinc-500" />
              <input
                name="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                onBlur={checkUsernameAvailability}
                className="w-full placeholder:text-zinc-500 bg-transparent outline-none placeholder:select-none"
                placeholder="Choose a username"
              />
              {isChecking && (
                <LoaderCircle size={20} className="animate-spin" />
              )}
              {isAvailable && !isChecking && (
                <Check size={20} className="text-green-500" />
              )}
            </div>
            {error && (
              <div className="flex items-center gap-1.5 mt-1 text-red-500 text-sm">
                <Info size={14} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
            <div className="flex items-start gap-2">
              <UserRound size={20} className="mt-0.5 text-zinc-400" />
              <div>
                <h3 className="font-semibold">Username requirements</h3>
                <ul className="text-sm text-zinc-400 mt-1 space-y-1">
                  <li>• Only letters, numbers, and underscores</li>
                  <li>• At least 3 characters</li>
                  <li>• Cannot contain spaces or special characters</li>
                  <li>• Must be unique</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 select-none mt-2 justify-end">
            <Button onClick={() => router.back()} variant={"secondary"}>
              Cancel
            </Button>
            <Button
              onClick={updateUsername}
              disabled={isUpdating || isChecking || !!error}
            >
              {isUpdating ? (
                <LoaderCircle size={23} className="animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HandlePage;
