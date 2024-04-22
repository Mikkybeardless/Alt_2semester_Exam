import * as authService from "../services/auth.service.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
  return  res.status(200).json({
      message: "Login successful",
      data: {
        accessToken: token,
      },
     
    });
   
  } catch (err) {
   return res.status(err.status || 500).json({ message: err.message });
  }
};

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;
    const newUser = await authService.register(first_name, last_name, email, password, role);
    const token = await authService.login(email, password);
   return res.status(201).json({
      message: "User created successfully",
      data: {
        user: newUser,
        accessToken: token
      },
    });
  } catch (err) {
   return  res.status(err.status || 500).json({ message: err.message });
  }
};
