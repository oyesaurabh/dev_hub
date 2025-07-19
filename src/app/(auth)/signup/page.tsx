"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ForgotPassword,
  Mainicon,
  PageHead,
} from "@/components/page-components";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { toast } from "sonner";
import { axiosService } from "@/services";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpDrawerOpen, setOtpDrawerOpen] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      toast.error("Username is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleVerifyEmail = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setIsLoading(true);
      const { status, message } = await axiosService.sendOtp({
        email: formData.email,
      });
      if (!status) throw new Error(message ?? "Server error!");
      toast.success(message ?? "OTP sent!");
      setOtpDrawerOpen(true);
    } catch (error: any) {
      console.error("error sending otp", error);
      toast.error(error.message ?? "Error sending otp");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: any) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error("Please enter the OTP");
      return;
    }
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const { status, message } = await axiosService.verifyandsignup({
        ...formData,
        otp,
      });
      if (!status) throw new Error(message ?? "Server error!");
      toast.success("User created successfully!");
      setOtpDrawerOpen(false);
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error: any) {
      console.error("error creating user", error);
      toast.error(error.message ?? "Error verifying or signup");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setIsLoading(true);
      const { status, message } = await axiosService.sendOtp({
        email: formData.email,
      });
      if (!status) throw new Error(message ?? "Server error!");
      toast.success(message ?? "OTP sent!");
    } catch (error: any) {
      console.error("error sending otp", error);
      toast.error(error.message ?? "Error sending otp");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHead title="Signup | Devhub" />
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className={cn("flex flex-col gap-6")}>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lg justify-center items-centers flex">
                  <Mainicon />
                </CardTitle>
                <CardDescription>
                  Create your new account to continue.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerifyEmail}>
                  <div className="grid gap-6">
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          type="text"
                          placeholder="tun.tun.mausi"
                          value={formData.username}
                          onChange={handleInputChange}
                          required
                        />
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="tuntunmausi@dholakpur.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid gap-3">
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                          <ForgotPassword />
                        </div>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="*********"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid gap-3">
                        <div className="flex items-center">
                          <Label htmlFor="confirmPassword">
                            Confirm Password
                          </Label>
                        </div>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="*********"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending OTP..." : "Verify Email"}
                      </Button>
                    </div>
                    <div className="text-center text-sm">
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="underline underline-offset-4"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
              By clicking continue, you agree to our{" "}
              <a
                href="https://youtu.be/6Kjf2BvPM-w?si=4Z87JR2xvHj9EFsg&t=2"
                target="_blank"
              >
                Terms of Service
              </a>
              {" and  "}
              <a
                href="https://youtu.be/fnqL88xAdaE?si=bKN8KjSK3F3Hf41g"
                target="_blank"
              >
                Privacy Policy
              </a>
              .
            </div>
          </div>
        </div>
      </div>

      {/* OTP Verification Drawer */}
      <Drawer open={otpDrawerOpen} onOpenChange={setOtpDrawerOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Verify Your Email</DrawerTitle>
              <DrawerDescription>
                Enter the 6-digit code sent to {formData.email}
              </DrawerDescription>
            </DrawerHeader>

            <div className="p-4 pb-0">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="number"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    disabled={isLoading}
                    className="text-center text-lg tracking-widest"
                  />
                </div>
              </div>
            </div>

            <DrawerFooter>
              <Button onClick={handleVerifyOTP} disabled={isLoading}>
                {isLoading ? "Verifying..." : "Sign Up Now"}
              </Button>
              <DrawerClose asChild>
                <Button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  variant={"secondary"}
                  className="w-full"
                >
                  {isLoading ? "Resending..." : "Resend"}
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
