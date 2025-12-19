import { User, type IUser } from "../database/schema/user.schema.js";
import { ErrorWithStatus } from "../exception/errorWithStatus.exception.js";
import type { queryType } from "../types/index.js";

interface UserApiResponse {
  data: IUser[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}
export const getAllUsers = async (
  page = 1,
  limit = 10,
  query: queryType = null
): Promise<UserApiResponse> => {
  try {
    const skip = (page - 1) * limit;
    const filter = query ? { name: { $regex: query, $options: "i" } } : {};
    const Users = await User.find(filter, {
      password: 0,
    })
      .skip(skip)
      .limit(limit);
    const total = await User.countDocuments(filter);
    return { data: Users, meta: { page, limit, total } };
  } catch (error) {
    console.log(error);
    throw new ErrorWithStatus((error as Error).message, 500);
  }
};
