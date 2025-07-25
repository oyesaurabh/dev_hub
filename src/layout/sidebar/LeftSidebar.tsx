"use client";

import CreatePost from "@/components/page-components/CreatePost";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { BsBell, BsBellFill } from "react-icons/bs";
import { FaRegUser, FaUser } from "react-icons/fa";
import { useLogout, useGetMe } from "@/hooks/useAuth";
import {
  IoBookmarks,
  IoBookmarksOutline,
  // IoFolderOpen,
  // IoFolderOpenOutline,
  IoSettingsOutline,
  IoSettingsSharp,
} from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import {
  MdChatBubble,
  MdChatBubbleOutline,
  // MdOutlineWork,
  // MdWorkOutline,
} from "react-icons/md";
import {
  RiHome2Fill,
  RiHome2Line,
  RiSearchFill,
  RiSearchLine,
} from "react-icons/ri";
import { SlOptions } from "react-icons/sl";
import { useGetUnreadNotificationsCount } from "@/hooks/useNotification";
import { Loader2 } from "lucide-react";
import { Mainicon } from "@/components/page-components";

const LeftSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { mutate: logout, isPending: isLogoutPending } = useLogout();
  const { data: me, isLoading: isMeLoading } = useGetMe();
  const {
    data: unreadNotificationsCount,
    isLoading: isUnreadNotificationsCountLoading,
  } = useGetUnreadNotificationsCount();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = [
    {
      href: "/home",
      label: "Home",
      icon: {
        filled: <RiHome2Fill className="text-xl" />,
        outline: <RiHome2Line className="text-xl" />,
      },
    },
    {
      href: "/search",
      label: "Search",
      icon: {
        filled: <RiSearchFill className="text-xl" />,
        outline: <RiSearchLine className="text-xl" />,
      },
    },
    {
      href: "/notifications",
      label: "Notifications",
      icon: {
        filled: (
          <div className="relative">
            <BsBellFill className="text-xl" />
            {isUnreadNotificationsCountLoading ? (
              <div className="absolute -top-2 -right-1.5">
                <Loader2 className="animate-spin" size={12} />
              </div>
            ) : unreadNotificationsCount?.count &&
              unreadNotificationsCount.count > 0 ? (
              <div className="absolute -top-2 -right-1.5 bg-primary rounded-full min-w-[16px] h-4 flex items-center justify-center">
                <span className="text-[10px] font-bold">
                  {unreadNotificationsCount.count > 99
                    ? "99+"
                    : unreadNotificationsCount.count}
                </span>
              </div>
            ) : null}
          </div>
        ),
        outline: (
          <div className="relative">
            <BsBell className="text-xl" />
            {isUnreadNotificationsCountLoading ? (
              <div className="absolute -top-2 -right-1.5">
                <Loader2 className="animate-spin" size={12} />
              </div>
            ) : unreadNotificationsCount?.count &&
              unreadNotificationsCount.count > 0 ? (
              <div className="absolute -top-2 -right-1.5 bg-primary rounded-full min-w-[16px] h-4 flex items-center justify-center">
                <span className="text-[10px] font-bold">
                  {unreadNotificationsCount.count > 99
                    ? "99+"
                    : unreadNotificationsCount.count}
                </span>
              </div>
            ) : null}
          </div>
        ),
      },
    },
    {
      href: "/chat",
      label: "Chat",
      icon: {
        filled: <MdChatBubble className="text-xl" />,
        outline: <MdChatBubbleOutline className="text-xl" />,
      },
    },
    {
      href: "/bookmarks",
      label: "Bookmarks",
      icon: {
        filled: <IoBookmarks className="text-xl" />,
        outline: <IoBookmarksOutline className="text-xl" />,
      },
    },
    {
      href: `/${me?.user.username}`,
      label: "Profile",
      icon: {
        filled: <FaUser className="text-xl" />,
        outline: <FaRegUser className="text-xl" />,
      },
    },
    {
      href: "/settings",
      label: "Settings",
      icon: {
        filled: <IoSettingsSharp className="text-xl" />,
        outline: <IoSettingsOutline className="text-xl" />,
      },
    },
  ];

  return (
    <div className="w-full flex flex-col justify-between py-4 select-none h-screen">
      <div className="flex flex-col gap-3">
        <div className="relative" ref={menuRef}>
          {isMeLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={22} />
              <p className="text-sm">Loading...</p>
            </div>
          ) : (
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={` flex cursor-pointer items-center justify-between gap-2 w-full -ml-1  rounded-2xl group/pfp  transition-all duration-200 py-2 px-2 select-none
              ${isOpen ? "bg-zinc-800 ml-0" : "hover:ml-0 hover:bg-zinc-800"}`}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={me?.user.profileImg || "/img/icon/main.svg"}
                  alt="Profile picture"
                  width={36}
                  height={36}
                  className="rounded-xl size-9 bg-white object-cover"
                />
                <div
                  className={`opacity-0  transition-all duration-200 ${
                    isOpen ? "opacity-100" : "group-hover/pfp:opacity-100"
                  }`}
                >
                  <h1 className="font-semibold text-sm truncate">
                    {me?.user.fullName}
                  </h1>
                  <p className="text-xs text-zinc-400 truncate">
                    @{me?.user.username}
                  </p>
                </div>
              </div>
              <div className="px-1">
                <SlOptions
                  className={`opacity-0  ${
                    isOpen ? "opacity-80" : "group-hover/pfp:opacity-80"
                  } transition-all duration-200`}
                />
              </div>
            </div>
          )}

          {isOpen && (
            <div className="absolute top-16 left-0 w-full bg-zinc-800 cursor-pointer flex flex-col gap-1 p-2 select-none rounded-2xl">
              <button
                onClick={handleLogout}
                className="font-semibold flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl hover:bg-zinc-500/20 transition-colors duration-200"
              >
                {isLogoutPending ? (
                  <Loader2 className="animate-spin" size={22} />
                ) : (
                  <>
                    <LuLogOut className="" />
                    <p className="text-sm">Logout</p>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <nav className="flex flex-col gap-1 select-none">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium flex items-center gap-2 py-2.5 group/nav-link"
              style={{ fontWeight: pathname === link.href ? "600" : "normal" }}
            >
              {pathname === link.href ? link.icon.filled : link.icon.outline}
              <span className="group-hover/nav-link:ml-1.5 transition-all duration-200">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
        <CreatePost />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="flex items-center justify-center">
            <Mainicon />
          </div>
          <p className="text-xs text-zinc-300 mt-0.5 text-center">
            {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex gap-1 items-center text-xs text-zinc-400">
          <a
            href="https://x.com/oye__saurabh"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:underline hover:text-zinc-100 transition-opacity duration-200"
          >
            Support
          </a>
          {" • "}
          <a
            href="mailto:oye.saurabhyadav@gmail.com"
            className="cursor-pointer hover:underline hover:text-zinc-100 transition-opacity duration-200"
          >
            Help
          </a>
          {" • "}
          <a
            href="https://youtu.be/JCNtTBkgbxE?si=k7LZY1RUG-r7mxr3"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:underline hover:text-zinc-100 transition-opacity duration-200"
          >
            Legal
          </a>
          {" • "}
          <a
            href="https://youtu.be/XOVYQeYWSJI?si=6B2bkqf0leOAyhsi&t=83"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:underline hover:text-zinc-100 transition-opacity duration-200"
          >
            Terms
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
