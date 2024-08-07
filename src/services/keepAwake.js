import Cron from "croner";
import axios from "axios";

const url = "https://alt-2sem-blogapi-exam.onrender.com"; // replace with your server's URL

const startKeepAliveJob = () => {
  const date = new Date();
  const time = date.toLocaleTimeString();
  const job = Cron("0 12 * * *", () => {
    // Runs every 2 minutes
    axios
      .get(url)
      .then((response) => {
        console.log("Server is up and running, time:", time);
      })
      .catch((error) => {
        console.error("Error keeping server alive:", error.message);
      });
  });
};
export default startKeepAliveJob;
