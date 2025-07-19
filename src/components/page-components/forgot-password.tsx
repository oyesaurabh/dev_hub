"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSendCode = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("OTP sent to your email successfully!");
      setStep(2);
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (otp === "123456") {
        // Mock verification
        toast.success("OTP verified successfully!");
        setStep(3);
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    }, 1000);
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Password reset successfully!");
      // Reset form after success
      setTimeout(() => {
        resetForm();
        setOpen(false);
      }, 2000);
    }, 1500);
  };

  const resetForm = () => {
    setStep(1);
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button className="ml-auto text-sm underline-offset-4 hover:underline">
            Forgot your password?
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>
                {step === 1 && "Reset Password"}
                {step === 2 && "Verify OTP"}
                {step === 3 && "Create New Password"}
              </DrawerTitle>
              <DrawerDescription>
                {step === 1 &&
                  "Enter your email to receive a verification code"}
                {step === 2 && "Enter the 6-digit code sent to your email"}
                {step === 3 && "Create your new password"}
              </DrawerDescription>
            </DrawerHeader>

            <div className="p-4 pb-0">
              {/* Step 1: Email Input */}
              {step === 1 && (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: OTP Input */}
              {step === 2 && (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      disabled={isLoading}
                    />
                    <p className="text-sm text-muted-foreground">
                      Code sent to: {email}
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Password Reset */}
              {step === 3 && (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}
            </div>

            <DrawerFooter>
              {step === 1 && (
                <Button onClick={handleSendCode} disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Code"}
                </Button>
              )}

              {step === 2 && (
                <>
                  <Button onClick={handleVerifyOTP} disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Verify OTP"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    disabled={isLoading}
                  >
                    Back to Email
                  </Button>
                </>
              )}

              {step === 3 && (
                <Button onClick={handleResetPassword} disabled={isLoading}>
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
              )}

              <DrawerClose asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
