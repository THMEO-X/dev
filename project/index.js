const startClient = require("./core/client");
const { loadTokens } = require("./token/tokenManager");

loadTokens().forEach(startClient);