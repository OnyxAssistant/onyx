"use client"

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { cn } from "@onyx/ui/lib/utils"
import { userProfileSchema } from "@/lib/validations/user"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  buttonVariants,
  Input,
  Label,
  toast,
} from "@onyx/ui"
import { UserProfile } from "@/types/user";
import { Icons } from "@/components/shared/icons"

import { updateUserProfile, type FormData } from "@/actions/update-user-profile"

export function ProfileForm({ user }: { user: UserProfile }) {
  const [isPending, startTransition] = useTransition();
  const updateUserProfileWithId = updateUserProfile.bind(null, user.id);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user?.name || "",
    },
  })

  const onSubmit = handleSubmit(data => {
    startTransition(async () => {
      const { status } = await updateUserProfileWithId(data);

      if (status !== "success") {
        toast({
          title: "Error",
          description: "There was a problem updating your profile.",
          variant: "destructive",
        })
      } else {
        toast({
          description: "Your profile has been updated.",
        })
      }
    });

  });

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Manage your public profile information.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                className="w-full sm:w-[400px]"
                size={32}
                {...register("name")}
              />
              {errors?.name && (
                <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            <span>{isPending ? "Saving..." : "Save changes"}</span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
