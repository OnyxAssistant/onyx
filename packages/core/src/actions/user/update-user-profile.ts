"use server";

import { authOptions } from "@onyx/core/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@onyx/db";
import { userProfileSchema } from "@onyx/core/lib/validations/user";
import { revalidatePath } from "next/cache";

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

    await prisma['core'].user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
      },
    });

    revalidatePath('/dashboard/profile');
    return { status: "success" };
  } catch (error) {
    console.log(error)
    return { status: "error" };
  }
}
