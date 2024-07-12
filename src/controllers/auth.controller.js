import * as authService from "../services/auth.service.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const token = await authService.login(email, password);
  res.setHeader("Authorization", `Bearer ${token}`);
  res.status(200).render("profile", {
    message: "Login successful",
    data: {
      accessToken: token,
    },
  });
};

export const register = async (req, res, next) => {
  const { first_name, last_name, email, password, role } = req.body;
  const newUser = await authService.register(
    first_name,
    last_name,
    email,
    password,
    role
  );
  const token = await authService.login(email, password);
  res.setHeader("Authorization", `Bearer ${token}`);
  res.status(201);
  res.json({
    message: "User created successfully",
    data: {
      user: newUser,
      accessToken: token,
    },
  });
};

export const signInPage = (req, res) => {
  res.render("signin");
};

export const signUpPage = (req, res) => {
  res.render("signup");
};
