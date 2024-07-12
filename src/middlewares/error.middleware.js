import logger from "../../logger/logger.js";

export const error = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send(err.message);
};
