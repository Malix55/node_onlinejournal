const express = require("express");
const router = express.Router();

// @desc login/landing page
// @route  GET/

router.get("/", (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

// @desc dashboard
// @route  GET /dashboard

router.get("/dashboard", (req, res) => {
  res.render("Dashboard");
});

module.exports = router;
