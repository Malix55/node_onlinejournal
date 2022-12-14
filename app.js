const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");

const connectDB = require("./config/db");

//load config
dotenv.config({ path: "./config/config.env" });

// passport config
require("./config/passport")(passport);

connectDB();

const app = express();

//logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//handlebars
app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

//session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

//static folder
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port:${PORT}`
  )
);
