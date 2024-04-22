import { Blog } from "../database/schema/blog.schema.js";
import * as BlogService from "./blog.service.js";

describe("Service: Blog Service", function () {
  // let User;
  // let getAllUsers;

  beforeEach(() => {
    jest.reset;
  });

  it("should return all blogs", async () => {
    // Given
    const mockUsers = [
      {
        title: "Blog 1",
        description: "my first test",
        author: "Igashi",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen boo",
      },
      {
        title: "Blog 2",
        description: "my second test",
        author: "Igashi",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae dui vel justo venenatis tristique. Quisque consequat lectus ac justo molestie, at facilisis mauris pellentesque. In quis mattis risus, vel cursus sem.",
      },
    ];
    Blog.find = jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnValue(mockUsers),
    });
    // this style below also works
    // jest.spyOn(User, "find").mockReturnValue({
    //   skip: jest.fn().mockReturnThis(),
    //   limit: jest.fn().mockReturnValue(users),
    // });
    Blog.countDocuments = jest.fn().mockResolvedValue(mockUsers.length);

    // When
    const result = await BlogService.getAllBlogs();

    // Then
    expect(result.data).toEqual(mockUsers);
    expect(result.meta.total).toEqual(mockUsers.length);
    expect(Blog.find).toHaveBeenCalledTimes(1);
    expect(Blog.countDocuments).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when failed to get all users", async () => {
    // Given
    Blog.find = jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockRejectedValue(new Error("Failed to get users")),
    });

    await expect(BlogService.getAllBlogs()).rejects.toThrow(
      "Failed to get users"
    );
  });
});
