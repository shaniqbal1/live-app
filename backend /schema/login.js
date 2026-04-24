import * as z from "zod";
const loginUserSchema = z.object({
        email: z.email().trim(), 
        password: z.string().trim().min(8, "Password should have atleast 8 chars")
    })

export default loginUserSchema;