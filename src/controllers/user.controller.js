import * as userService from "../services/user.service.js";

export const getAllUsers = async (req, res) => {
  try {
    console.log("blog", req.user);
    let page = Number(req.query.page) || 1;
    page = page < 1 ? 1 : page;
    let limit = Number(req.query.limit) || 10;
    limit = limit < 1 ? 10 : limit;
    const query = req.query.q;
    const { data, meta } = await userService.getAllUsers(page, limit, query);
    res.json({ message: "Get all Users", data, meta });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};