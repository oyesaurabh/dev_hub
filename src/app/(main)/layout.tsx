"use client";
import AuthGuard from "@/components/AuthGuard";
import MainWrapper from "@/layout/MainWrapper";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <MainWrapper>{children}</MainWrapper>
    </AuthGuard>
  );
}
