"use server";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { userProfileSchema } from "@/lib/validations/user";
import { revalidatePath } from "next/cache";
import { api } from "@/api";

export type FormData = {
  name: string;
};

export async function updateUserProfile(userId: string, data: FormData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session?.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { name } = userProfileSchema.parse(data);

    await api.patch(`/user`, { name });

    revalidatePath('/dashboard/profile');
    return { status: "success" };
  } catch (error) {
    console.log(error)
    return { status: "error" };
  }
}