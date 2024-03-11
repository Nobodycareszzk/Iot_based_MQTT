const MQTT_PORT = 9000;
const BROKER_ID = "ZZK";
const URL = `mqtt://localhost:${MQTT_PORT}`;
const SERVICE_OPTIONS = {
  clientId: "service",
};

const SECRET_KEY = "zzk";

module.exports = {
  MQTT_PORT,
  BROKER_ID,
  URL,
  SERVICE_OPTIONS,
  SECRET_KEY,
};
