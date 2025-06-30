import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });

  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    status: true,
    message: "User logged in successfully",
    data: {
      token: result.token,
      _id: result.user._id,
      name: result.user.name,
      id: result.user.id,
      role: result.user.role,
    },
  });
});

export const authController = {
    login
}
