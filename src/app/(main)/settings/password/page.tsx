"use client";

import { useState, useEffect } from "react";
import { LoaderCircle, Shield } from "lucide-react";
import Header from "@/components/page-components/SettingHeader";
import { useUpdateUserProfile } from "@/hooks/useUser";
import { Input } from "@/components/ui/input";
import PageHead from "@/components/page-components/Pagehead";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PasswordPage = () => {
  const { mutate: updateUserProfile, isPending: isUpdating } =
    useUpdateUserProfile();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    if (newPassword && confirmPassword) {
      setPasswordsMatch(newPassword === confirmPassword);
    } else {
      setPasswordsMatch(true);
    }
  }, [newPassword, confirmPassword]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!passwordsMatch) {
      toast.error("New passwords don't match!");
      return;
    }

    // Submit form
    updateUserProfile({
      currentPassword,
      newPassword,
    });
  };

  return (
    <>
      <PageHead title="Password Settings | Devhub" />
      <Header title="Password" />

      <div className="flex flex-col p-4">
        <div className="bg-zinc-800/30 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield size={20} className="text-primary" />
            <h2 className="font-semibold">Password Security</h2>
          </div>
          <p className="text-sm text-zinc-400">
            Protect your account with a strong password. For maximum security,
            use a unique password that you don&apos;t use for other accounts.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="Current Password"
            type="password"
            value={currentPassword}
            required
            onChange={(e: any) => {
              setCurrentPassword(e.target.value);
            }}
          />

          <Input
            placeholder="New Password"
            type="password"
            value={newPassword}
            onChange={(e: any) => {
              setNewPassword(e.target.value);
            }}
          />

          <Input
            placeholder="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e: any) => {
              setConfirmPassword(e.target.value);
            }}
          />

          {!passwordsMatch && (
            <p className="text-red-500 text-sm -mt-2">
              Passwords don&apos;t match
            </p>
          )}

          <div className="flex items-center mt-2">
            <Button type="submit" disabled={isUpdating} variant={"secondary"}>
              {isUpdating ? (
                <LoaderCircle size={20} className="animate-spin" />
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </form>

        <div className="mt-8 border-t border-zinc-700 pt-6">
          <h3 className="font-semibold mb-2">Password Requirements</h3>
          <ul className="text-sm text-zinc-400 space-y-1">
            <li>• At least 8 characters long</li>
            <li>• Include at least one uppercase letter</li>
            <li>• Include at least one number</li>
            <li>• Include at least one special character</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PasswordPage;
