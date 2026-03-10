import * as z from "zod";

const registerUserSchema = z.object({
  name: z.string().trim().min(3,"Name must be atleast 3 chars"),
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
  gender: z.enum(["male","female","other"])
})

export { registerUserSchema };
