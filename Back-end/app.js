const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const login = require("./src/Routes/login.route");
const auth = require("./src/Routes/auth.route");
const user = require("./src/Routes/user.route");
const { authenticatedUser } = require("./src/middlewares/auth_user.middleware");

// Middleware
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/public`));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(cookieParser());

app.use("/login", login);

app.use("/auth", auth);

app.use("/user", user);

app.use(authenticatedUser);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
