import * as React from "react";

import { cn } from "@/lib/utils";

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
  text?: string;
}

export function DashboardShell({
  heading,
  text,
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={cn("grid items-start gap-8 pb-16", className)} {...props}>
      <div className="grid gap-1">
        {heading && (
          <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        )}
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  );
}
