import { api } from "@onyx/api";

export const getProfile = async () => {
  try {
    const user = await api.get(`/user`);

    return user;
  } catch (error) {
    return { error }
  }
};
