"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./page-components";
import { axiosService } from "@/services";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const authRoutes = ["/login", "/signup"];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await axiosService.isAuth();
        const { message, status } = data;

        if (!status) {
          throw new Error(message);
        }

        setIsAuthenticated(true);

        // If user is authenticated but on auth routes, redirect to home/dashboard
        if (isAuthRoute) {
          router.push("/home");
        }
      } catch (error) {
        setIsAuthenticated(false);

        if (!isAuthRoute) {
          router.push("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [isAuthRoute, router]);

  // Show loading screen while checking authentication
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If on auth routes and not authenticated, show auth pages
  if (isAuthRoute && !isAuthenticated) {
    return <>{children}</>;
  }

  // If authenticated, show protected content
  if (isAuthenticated && !isAuthRoute) {
    return <>{children}</>;
  }

  // Fallback: show loading (user is being redirected)
  return <LoadingScreen />;
};

export default AuthGuard;
