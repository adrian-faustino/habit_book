require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

/** Constants **/
const PORT = process.env.PORT;

/** Middleware **/
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  const absPath = path.join(__dirname, "../client/build");
  app.use(express.static(absPath));
}

/** Routes **/
const homeRoutes = require("./routes");
const userRoutes = require("./routes/userCRUD");
const userAuth = require("./routes/userAuth");
const habitRoutes = require("./routes/habitCRUD");
const completed_atRoutes = require("./routes/completed_atCRUD");
const commentRoutes = require("./routes/commentsCRUD");
const userSearch = require("./routes/userSearch");
const followRoutes = require("./routes/followCRUD");

app.use("/login", userAuth);
app.use("/users", userRoutes);
app.use("/habits", habitRoutes);
app.use("/completed_at", completed_atRoutes);
app.use("/search", userSearch);
app.use("/comments", commentRoutes);
app.use("/follows", followRoutes);
app.use("/", homeRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
