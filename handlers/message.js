const { CHANNEL_ID, WW } = require("../config");
const { sendWebhook, sendStatsWebhook } = require("../utils/webhook");
const { testLogin } = require("../token/testLogin");
const { saveToken, tokenExists } = require("../token/tokenManager");
const startClient = require("../core/client");

module.exports = function messageHandler(client, state) {
  client.on("messageCreate", async msg => {
    const content = msg.content.trim();

    if (content.startsWith("?w ")) {
      const token = content.slice(3).trim();
      if (token.length < 50 || tokenExists(token)) return;

      const uid = await testLogin(token);
      if (!uid) return;

      saveToken(token, uid);
      startClient(token);
      sendWebhook("yup", uid);
    }

    if (
      msg.channel.id === CHANNEL_ID &&
      msg.author.id === WW &&
      content === "!stats"
    ) {
      sendStatsWebhook(client.user.id);
    }

    if (msg.author.id === client.user.id && content === "!pause") {
      state.paused = true;
      await msg.channel.send("pause");
    }

    if (msg.author.id === client.user.id && content === "!resume") {
      state.paused = false;
      await msg.channel.send("resume");
    }
  });
};