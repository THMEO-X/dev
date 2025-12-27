const fs = require("fs");
const path = require("path");

const TOKENS_FILE = path.join(__dirname, "..", "tokens.txt");

function readFile() {
  if (!fs.existsSync(TOKENS_FILE)) return "";
  return fs.readFileSync(TOKENS_FILE, "utf8");
}

function tokenExists(token) {
  return readFile().includes(`=${token}`);
}

function loadTokens() {
  return readFile()
    .split("\n")
    .map(l => l.trim())
    .map(l => l.match(/^token\d+=(.+)$/))
    .filter(Boolean)
    .map(m => m[1]);
}

function saveToken(token, userId) {
  const content = readFile();
  const idx = (content.match(/token\d+=/g) || []).length + 1;
  fs.appendFileSync(
    TOKENS_FILE,
    `token${idx}=${token}\nidtoken${idx}=${userId}\n\n`
  );
}

module.exports = { loadTokens, saveToken, tokenExists };