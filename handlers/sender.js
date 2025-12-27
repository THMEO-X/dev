const { WORDS, CHANNEL_ID, OREP_TARGET_ID, TEXT_INTERVAL } = require("../config");
const { rand } = require("../utils/random");
const { getVNDate, nowTime } = require("../utils/time");
const { stats } = require("../utils/stats");

module.exports = async function sender(client, state) {
  const ch = await client.channels.fetch(CHANNEL_ID);
  const now = getVNDate();
  const h = now.getHours();
  const m = now.getMinutes();

  if (h === 15 && m < 30) {
    await ch.send("odaily");
  } else if (h === 15 && m >= 30) {
    await ch.send(`orep <@${OREP_TARGET_ID}>`);
  } else {
    const msg = WORDS[rand(0, WORDS.length - 1)];
    await ch.send(msg);

    if (msg === "oh") stats.oh++;
    if (msg === "ob") stats.ob++;

    console.log(`${nowTime()} ${msg} ${client.user.username}`);
  }

  let tick = 0;
  const timer = setInterval(async () => {
    if (state.paused || tick >= 3) return clearInterval(timer);

    const sendCount = rand(1, 5);
    for (let i = 0; i < sendCount; i++) {
      if (state.sentenceIndex >= state.sentences.length)
        state.sentenceIndex = 0;

      await ch.send(state.sentences[state.sentenceIndex++]);
    }
    tick++;
  }, TEXT_INTERVAL);
};