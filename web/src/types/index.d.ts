import type { Icon } from "lucide-react";

import Icons from "@/components/icons";


export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  isAdmin?: boolean;
  isPremium?: boolean;
  isPartner?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);


export type DashboardConfig = {
  sidebarNav: SidebarNavItem[];
};
