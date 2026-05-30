require("dotenv").config();

const express = require("express");
const axios = require("axios");

const tracker = require("./middleware/tracker");
const rankNotifications = require("./utils/rankingEngine");

const app = express();

app.use(tracker);

const PORT = 3000;

const NOTIFICATION_API =
  "http://4.224.186.213/evaluation-service/notifications";

app.get(
  "/notifications",
  async (req, res) => {

    try {

      const response =
        await axios.get(
          NOTIFICATION_API,
          {
            headers: {
              Authorization:
                `Bearer ${process.env.ACCESS_TOKEN}`
            }
          }
        );

      const notifications =
        response.data.notifications;

      const rankedNotifications =
        rankNotifications(
          notifications
        );

      res.status(200).json({
        success: true,
        count:
          rankedNotifications.length,
        notifications:
          rankedNotifications
      });

    } catch (error) {

      console.error(error.message);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch notifications"
      });
    }
  }
);

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});