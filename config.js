require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || "",  // your bot token
  logs: process.env.LOGS || "", // channel id for status logs

  nodes: [
    {
      identifier:"",
      host: "",
      port: parseInt(""),
      password: "",
      retryDelay: parseInt("3000"),
      secure: parseBoolean("")
    }
  ],

}
function parseBoolean(value) {
  if (typeof (value) === 'string') {
    value = value.trim().toLowerCase();
  }
  switch (value) {
    case true:
    case "true":
      return true;
    default:
      return false;
  }
}
