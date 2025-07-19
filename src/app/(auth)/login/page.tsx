"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
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
import { ForgotPassword, Mainicon } from "@/components/page-components";
import { toast } from "sonner";
import { axiosService } from "@/services";
import { useRouter } from "next/navigation";
import { PageHead } from "@/components/page-components";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { status, message } = await axiosService.login({
        identifier: email,
        password,
      });
      if (!status) throw new Error(message);
      setTimeout(() => {
        router.push("/home");
      }, 1000);
      toast.success(message ?? "Authorized");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message ?? "Server error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <PageHead title="Login | Devhub" />
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className={cn("flex flex-col gap-6")}>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lg justify-center items-centers flex">
                  <Mainicon />
                </CardTitle>
                <CardDescription>
                  Login to your account to continue.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin}>
                  <div className="grid gap-6">
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="email">Email or Username</Label>
                        <Input
                          id="email"
                          type="text"
                          placeholder="tuntunmausi@dholakpur.com"
                          value={email}
                          onChange={(e: any) => setEmail(e.target.value)}
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
                          type="password"
                          placeholder="*********"
                          value={password}
                          onChange={(e: any) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={loading || !email.trim() || !password.trim()}
                      >
                        Login
                      </Button>
                    </div>
                    <div className="text-center text-sm">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/signup"
                        className="underline underline-offset-4"
                      >
                        Sign up
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
    </>
  );
}
