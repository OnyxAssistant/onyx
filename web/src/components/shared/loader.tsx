"use client";
import React from "react";
import { useTheme } from "next-themes";
import { ThreeDots } from "react-loader-spinner";

export function Loader({ size = 40 }: { size?: number }) {
  const { theme } = useTheme();

  return (
      <ThreeDots 
        height={size} 
        width={size} 
        radius="10"
        color={theme === "dark" ? "#fff" : "#000"}
        ariaLabel="three-dots-loading"
        visible={true}
      />
  );
}