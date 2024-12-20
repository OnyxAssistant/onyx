"use client";

import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronsUpDown,
  LifeBuoy,
  Send,
  Plus,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Neuron } from "@/types/neuron";
import Icons from "@/components/icons";

export function OnyxSidebar({ user, neurons }: { user: any, neurons: Neuron[] }) {
  const defaultNav: any = {
    manifest: {
      slug: "onyx",
      name: "Onyx", 
      description: "The default neuron",
      url: "/dashboard/neuron",
      nav: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: "home",
          items: [],
        },
        {
          title: "Store",
          url: "/dashboard/store",
          icon: "store",
          items: [],
        },
      ],
    },
  };

  const allNeurons = [defaultNav, ...neurons];
  
  // Get initial active neuron from cookie or default
  const getInitialNeuron = () => {
    const savedSlug = document.cookie.split('; ').find(row => row.startsWith('activeSidebar='));
    if (savedSlug) {
      const slug = savedSlug.split('=')[1];
      const savedNeuron = allNeurons.find(n => n.manifest.slug === slug);
      return savedNeuron || defaultNav;
    }
    return defaultNav;
  };

  const [activeNeuron, setActiveNeuron] = useState(defaultNav);

  useEffect(() => {
    setActiveNeuron(getInitialNeuron());
  }, []);

  const handleNeuronChange = (neuron: any) => {
    setActiveNeuron(neuron);
    document.cookie = `activeSidebar=${neuron.manifest.slug};path=/;max-age=31536000`;
  };

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground dark:bg-black dark:text-sidebar-primary-foreground-dark">
                    <Icons.logo className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {activeNeuron.manifest.name}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Neurons
                </DropdownMenuLabel>
                {allNeurons.map((neuron, index) => (
                  <DropdownMenuItem
                    key={neuron.manifest.slug}
                    onClick={() => handleNeuronChange(neuron)}
                    className="gap-2 p-2"
                  >
                    {neuron.manifest.name}
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <Link href="/dashboard/store">
                    <div className="font-medium text-muted-foreground">
                      Add neuron
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{activeNeuron.manifest.name}</SidebarGroupLabel>
          <SidebarMenu>
            {activeNeuron.manifest.nav.map((item: any) => (
              <Collapsible key={item.title} asChild defaultOpen={true}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      {Icons[item.icon as keyof typeof Icons] ? (
                        React.createElement(
                          Icons[item.icon as keyof typeof Icons]
                        )
                      ) : (
                        <Icons.home />
                      )}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem: any) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="sm">
                  <Link href="https://onyxassistant.com">
                    <LifeBuoy />
                    <span>Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="sm">
                  <Link href="https://x.com/onyxassistant">
                    <Send />
                    <span>Feedback</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="sm"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Icons.user className="size-4 rounded-lg" />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    {user?.name && (
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>
                    )}
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      {user?.name && (
                        <span className="truncate font-semibold">
                          {user.name}
                        </span>
                      )}
                      {user?.email && (
                        <span className="truncate text-xs">{user.email}</span>
                      )}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center space-x-2.5"
                    >
                      <Icons.user className="size-4" />
                      <p className="text-sm">Account</p>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="#" className="flex items-center space-x-2.5">
                      <Icons.bell className="size-4" />
                      <p className="text-sm">Notifications</p>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
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
                    <Icons.logout className="size-4" />
                    <p className="text-sm">Logout</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
