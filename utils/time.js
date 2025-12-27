function getVNDate() {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );
}

function nowTime() {
  return getVNDate().toLocaleTimeString("vi-VN", { hour12: false });
}

module.exports = { getVNDate, nowTime };