const { Client } = require("discord.js-selfbot-v13");

function testLogin(token) {
  return new Promise(res => {
    const c = new Client({ checkUpdate: false });
    c.once("ready", () => {
      const id = c.user.id;
      c.destroy();
      res(id);
    });
    c.login(token).catch(() => res(null));
  });
}

module.exports = { testLogin };