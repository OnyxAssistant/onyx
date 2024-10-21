"use client";

import Link from "next/link";
import {
  LogOut,
  User as UserIcon,
} from "lucide-react";

import type { User } from "next-auth";
import { signOut } from "next-auth/react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@onyx/ui";

import { dashboardConfig } from "@/config/dashboard";
import { Icons } from "@/components/shared/icons";
interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email"> & { type?: string };
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          className="gap-2 px-4"
          variant="default"
          size="sm"
          rounded="full"
        >
          <Icons.logo className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.name && <p className="font-medium">{user?.name}</p>}
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user?.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {dashboardConfig.sidebarNav.map((item, index) => {
          if (item.isAdmin && user && user.type !== "admin") {
            return null;
          }
          const Icon = Icons[item.icon || "arrowRight"];
          return (
            <DropdownMenuItem asChild key={index}>
              <Link
                href={item.href || "/"}
                className="flex items-center space-x-2.5"
              >
                <Icon className="size-4" />
                <p className="text-sm">{item.title}</p>
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/`,
            });
          }}
        >
          <div className="flex items-center space-x-2.5">
            <LogOut className="size-4" />
            <p className="text-sm">Logout</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
