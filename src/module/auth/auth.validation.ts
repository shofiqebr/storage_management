import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    id: z
      .string({ required_error: "ID is required" })
      .min(3, { message: "ID must be at least 3 characters long" }),

    password: z
      .string({ required_error: "Password is required" })
      .min(3, { message: "Password must be at least 3 characters long" }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
};
