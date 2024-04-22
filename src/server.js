import { connect } from "./database/connection.js";
import app from "./app.js";

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

connect(MONGODB_URL).then(() => {
  console.log("Connected to DB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});