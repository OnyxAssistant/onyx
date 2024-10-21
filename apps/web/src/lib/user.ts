import { prisma } from "@onyx/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        name: true,
        emailVerified: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id }});

    return user;
  } catch (error) {
    return { error }
  }
};

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return users;
  } catch (error) {
    return error;
  }
};
