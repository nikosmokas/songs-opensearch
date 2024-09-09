const express = require("express");
const cors = require("cors"); // Import CORS
const app = express();
const searchRoutes = require("./routes/search");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/search", searchRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
