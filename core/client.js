const { Client } = require("discord.js-selfbot-v13");
const { INTERVAL } = require("../config");
const resting = require("./resting");
const sender = require("../handlers/sender");
const messageHandler = require("../handlers/message");
const { loadAllSentences } = require("../utils/textLoader");

const clients = new Map();

module.exports = function startClient(token) {
  if (clients.has(token)) return;

  const client = new Client({ checkUpdate: false });
  const state = {
    paused: false,
    activeFrom: Date.now(),
    restUntil: 0,
    sentences: loadAllSentences(),
    sentenceIndex: 0
  };

  client.once("ready", () => {
    console.log("login", client.user.username);

    setInterval(async () => {
      if (state.paused || resting(state)) return;
      await sender(client, state);
    }, INTERVAL);
  });

  messageHandler(client, state);
  client.login(token).catch(() => {});
  clients.set(token, client);
};