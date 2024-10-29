"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components";

import { SidebarTrigger } from "@/components/ui/sidebar";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";
import { Dock, DockIcon } from "@/components";
import Icons from "@/components/icons";


export default function DockComponent() {
  const { theme, setTheme } = useTheme();

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
                    "size-12 rounded-full"
                  )}
                >
                  <Icons.home className="size-4" />
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
                    "size-12 rounded-full"
                  )}
                >
                  <Icons.store className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Store</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon>
            <SidebarTrigger />
          </DockIcon>

          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "size-12 rounded-full"
                  )}
                >
                  <Icons.bell className="size-4" />
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
                      <Icons.settings className="size-4" />
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
