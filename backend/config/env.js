const { cleanEnv, str, port, url } = require('envalid');
const dotenv = require('dotenv');

dotenv.config();

module.exports = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  MONGO_URI: url(),
  JWT_SECRET: str(),
});
