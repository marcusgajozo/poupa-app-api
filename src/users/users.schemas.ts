import z from "zod";

export const getUsersSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
  })
);

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email format"),
});
