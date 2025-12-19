import Joi from "joi";

export const blogPostSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  body: Joi.string().required(),
  author: Joi.string().required(),
});
