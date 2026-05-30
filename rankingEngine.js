const { TYPE_WEIGHTS } = require("../constants");

function calculateScore(notification) {
  const typeScore =
    TYPE_WEIGHTS[notification.Type] || 0;

  const currentTime = Date.now();

  const notificationTime =
    new Date(notification.Timestamp).getTime();

  const ageInMinutes =
    (currentTime - notificationTime) /
    (1000 * 60);

  const recencyBonus =
    Math.max(0, 50 - ageInMinutes);

  return typeScore + recencyBonus;
}

function rankNotifications(notifications) {
  return notifications
    .map((notification) => ({
      ...notification,
      priorityScore:
        calculateScore(notification)
    }))
    .sort(
      (a, b) =>
        b.priorityScore - a.priorityScore
    )
    .slice(0, 10);
}

module.exports = rankNotifications;