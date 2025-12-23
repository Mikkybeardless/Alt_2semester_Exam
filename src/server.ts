import { connect } from "./database/connection.js";
import app from "./app.js";
import logger from "./logger/logger.js";
import startKeepAliveJob from "./services/keepAwake.js";

const MONGODB_URL = process.env.MONGODB_URL || "";
const PORT = process.env.PORT || 8900;

connect(MONGODB_URL)
  .then(() => {
    logger.info("Connected to DB");
    startKeepAliveJob();
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    logger.error("Error connecting to DB:", error.message);
  });
