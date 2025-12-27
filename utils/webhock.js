const https = require("https");
const { URL } = require("url");
const { WEBHOOK_URL } = require("../config");
const { stats } = require("./stats");

function sendWebhook(text, id) {
  const data = JSON.stringify({ content: `<@${id}> ${text}` });
  const url = new URL(WEBHOOK_URL);

  const req = https.request({
    hostname: url.hostname,
    path: url.pathname,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data)
    }
  });

  req.write(data);
  req.end();
}

function sendStatsWebhook(userId) {
  const hours = (Date.now() - stats.startTime) / 3600000;

  const data = JSON.stringify({
    content: `<@${userId}>`,
    embeds: [{
      title: "📊 STATS",
      description:
        `- oh: **${stats.oh}**\n` +
        `- ob: **${stats.ob}**\n` +
        `- time: **${hours.toFixed(2)}h**`,
      timestamp: new Date()
    }]
  });

  const url = new URL(WEBHOOK_URL);
  const req = https.request({
    hostname: url.hostname,
    path: url.pathname,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data)
    }
  });

  req.write(data);
  req.end();
}

module.exports = { sendWebhook, sendStatsWebhook };