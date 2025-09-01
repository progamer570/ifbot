import env from "../services/env.js";
import logger from "../utils/logger.js";

function sendRequest() {
  fetch(env.otherDomain)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      logger.info("Response from other domain:", data);
    })
    .catch((error) => {
      logger.error("Error sending request to other domain:", error);
    });
}
export default sendRequest;
