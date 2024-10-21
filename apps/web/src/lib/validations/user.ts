import * as z from "zod"

export const userProfileSchema = z.object({
  name: z.string().min(3).max(32),
})
