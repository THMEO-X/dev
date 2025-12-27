const { rand } = require("../utils/random");

module.exports = function resting(state) {
  const now = Date.now();
  if (now < state.restUntil) return true;

  const mins = (now - state.activeFrom) / 60000;
  if (mins >= rand(25, 30)) {
    const rest = Math.random() < 0.2 ? 10 : rand(5, 7);
    state.restUntil = now + rest * 60000;
    state.activeFrom = state.restUntil;
    return true;
  }
  return false;
};