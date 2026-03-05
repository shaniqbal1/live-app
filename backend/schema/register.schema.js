import * as z from "zod";

const registerUserSchema = z.object({
    firstName:z.string().trim().min(3, "First name must e atleast more then 3 chars"),
    email:z.email().lowercase(),
    password:z.string().min(8 , "Password must have atleast more then 8 chars"),
    gender:z.enum(["male" , "female" , "other"] , "Gender value must be male , femlae  or other")
})

export default registerUserSchema;