import type { Request, Response } from "express";

import * as authService from "../services/auth.service.js";
import logger from "../logger/logger.js";
import type { ErrorWithStatus } from "../exception/errorWithStatus.exception.js";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    //res.setHeader("Authorization", `Bearer ${token}`);
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // res.status(303).redirect("/profile");
    res.status(200);
    res.json({
      message: "User logged in successfully",
      data: {
        accessToken: token,
      },
      success: true,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: (error as ErrorWithStatus).message,
      success: false,
      status: (error as ErrorWithStatus).status,
    }); // Internal Server Error
  }
};

export const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password, role } = req.body;
  try {
    await authService.register({
      first_name,
      last_name,
      email,
      password,
      role,
    });
    const token = await authService.login(email, password);
    // res.setHeader("Authorization", `Bearer ${token}`);
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // res.status(303).redirect("/profile");
    res.status(201);
    res.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: (error as ErrorWithStatus).message,
      success: false,
      status: (error as ErrorWithStatus).status,
    }); // Internal Server Error
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email, resetUrl } = req.body;

  try {
    const data = await authService.forgotPassword(email, resetUrl);
    res.status(200).json({
      message: "Password reset email sent",
      success: true,
      data,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: (error as ErrorWithStatus).message,
      success: false,
      status: (error as ErrorWithStatus).status,
    }); // Internal Server Error
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, token, newPassword } = req.body;
  try {
    await authService.resetPassword(email, token, newPassword);
    res.status(200).json({
      message: "Password reset successful",
      success: true,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: (error as ErrorWithStatus).message,
      success: false,
      status: (error as ErrorWithStatus).status,
    }); // Internal Server Error
  }
};
