"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/img/logo.png";
import logo_white from "@/assets/img/logo_white.png";
import { useTheme } from "next-themes";
import { Button } from "@/components";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <Image
        src={theme === "dark" ? logo_white : logo}
        alt="Onyx Logo"
        width={200}
        height={200}
      />
      <h1 className="text-4xl font-bold">Welcome to Onyx</h1>
      <Link href="/login">
        <Button size="lg">Login</Button>
      </Link>
    </div>
  );
}
