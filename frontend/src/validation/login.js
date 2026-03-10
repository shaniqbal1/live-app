import * as z from "zod";

const loginSchema = z.object({
    email: z.string().email().trim(), 
    password: z.string().trim().min(8, "Password should have atleast 8 chars")
})

export { loginSchema };
