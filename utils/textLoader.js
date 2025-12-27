const fs = require("fs");
const path = require("path");
const { TEXT_FILES } = require("../config");

function loadAllSentences() {
  let sentences = [];

  for (const file of TEXT_FILES) {
    const p = path.join(__dirname, "..", file);
    if (!fs.existsSync(p)) continue;

    const raw = fs.readFileSync(p, "utf8");
    const matches = raw.match(/"([^"]+)"/g) || [];

    for (const m of matches) {
      const clean = m.replace(/"/g, "").trim();
      if (clean) sentences.push(clean);
    }
  }
  return sentences;
}

module.exports = { loadAllSentences };