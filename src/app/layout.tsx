import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TanstackProvider } from "@/provider/tanstack";
import { ThemeProvider } from "@/provider/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  description: "Devhub - The Developer's Social Terminal.",
  icons: {
    icon: {
      url: "./img/icon/main.svg",
      type: "image/svg",
    },
  },
  openGraph: {
    title: "Devhub",
    description: "The Developer's Social Terminal.",
    url: "https://notsaurabh-devhub.vercel.app",
    siteName: "Devhub",
    images: [
      {
        url: "./img/icon/main.svg",
        width: 1200,
        height: 630,
        alt: "Devhub - The Developer's Social Terminal.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devhub",
    description: "The Developer's Social Terminal.",
    images: ["./img/icon/main-dark.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-right" richColors closeButton />
          <TanstackProvider>{children}</TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
