"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  HomeIcon,
  Store,
  Settings,
  Bell
} from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@onyx/ui/lib/utils";
import { Button, buttonVariants } from "@onyx/ui";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@onyx/ui";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@onyx/ui";
import { Dock, DockIcon } from "@onyx/ui";
import { Icons } from "@/components/shared/icons";

import { UserAccountNav } from "./user-account-nav";

export default function DockComponent({ user }: { user: any }) {
  const router = useRouter();

  const { theme, setTheme } = useTheme();

  const handleLocaleChange = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
    router.refresh();
  };

  return (
    <div className="fixed bottom-10 left-[50%] z-50 flex translate-x-[-50%] flex-col items-center justify-center">
      <TooltipProvider>
        <Dock direction="middle" className="bg-background">
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "size-12 rounded-full",
                  )}
                >
                  <HomeIcon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/store"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "size-12 rounded-full",
                  )}
                >
                  <Store className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Store</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          {user ? (
            <DockIcon>
              <UserAccountNav user={user} />
            </DockIcon>
          ) : (
            <DockIcon>
              <Link href="/login">
                <Button
                  className="gap-2 px-4"
                  variant="default"
                  size="sm"
                  rounded="full"
                >
                  <User className="size-4" />
                </Button>
              </Link>
            </DockIcon>
          )}

          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "size-12 rounded-full",
                  )}
                >
                  <Bell className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 px-0" size="sm">
                      <Settings className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" className="w-4 p-1">
                    <DropdownMenuItem
                      onSelect={() =>
                        setTheme(theme === "light" ? "dark" : "light")
                      }
                    >
                      <div className="flex items-center">
                        <Icons.sun
                          className={`size-4 ${theme === "dark" && "hidden"}`}
                        />
                        <Icons.moon
                          className={`size-4 ${theme === "light" && "hidden"}`}
                        />
                        <span className="ml-2">Theme</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
