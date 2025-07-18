const app = require("./app");
const connectDB = require("./config/db");
const { PORT } = require("./config");

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});

//Graceful shutdown
function shutdown() {
  server.close(() => {
    console.log("Process terminated");
    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
