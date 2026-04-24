import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import ConnectDB from "./config/db.config.js";

const PORT = process.env.PORT || 8000;

// start server FIRST (important for debugging)
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

// connect DB after
ConnectDB()
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB error:", err));