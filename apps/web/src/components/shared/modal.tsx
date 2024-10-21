"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ThreeDots } from "react-loader-spinner";
import { Drawer } from "vaul";

import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/use-media-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  showModal: boolean;
  setShowModal: () => void;
  placeName?: string;
}

export function Modal({
  children,
  className,
  showModal,
  setShowModal,
  placeName,
}: ModalProps) {
  const [snap, setSnap] = useState<number | string | null>(0.8);
  const router = useRouter();
  const { isMobile } = useMediaQuery();
  const { theme } = useTheme();

  /*
  useEffect(() => {
    if (placeName && snap === 1) {
      router.push(`/place/${placeName}`);
    }
  }, [snap]);
  */

  useEffect(() => {
    router.prefetch(`/place/${placeName}`);
  }, []);

  if (isMobile) {
    return (
      <Drawer.Root
        snapPoints={placeName ? [0.73, 1] : [1]}
        open={showModal}
        onClose={setShowModal}
        setActiveSnapPoint={setSnap}
        activeSnapPoint={snap}
      >
        <Drawer.Overlay
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={setShowModal}
        />
        <Drawer.Portal>
          <Drawer.Content
            className={cn(
              "fixed inset-x-0 bottom-0 z-50 mt-24 overflow-hidden rounded-t-2xl border bg-background",
              className,
            )}
          >
            {placeName && (
              <div className="sticky top-0 z-20 flex w-full items-center justify-center bg-inherit">
                <div className="my-3 h-1.5 w-16 rounded-full bg-muted-foreground/20" />
              </div>
            )}
            {children}
            {/*
            {placeName && (
              <div className="flex h-44 items-center justify-center bg-secondary/50">
                <ThreeDots
                  color={theme === "dark" ? "#fff" : "#000"}
                  height={80}
                  width={80}
                />
              </div>
            )}
            */}
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    );
  }
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="overflow-hidden p-0 md:max-w-md md:rounded-2xl md:border">
        {children}
      </DialogContent>
    </Dialog>
  );
}
