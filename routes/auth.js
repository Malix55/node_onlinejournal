const express = require("express");
const router = express.Router();
const passport = require("passport");

// @desc auth with google
// @route  GET /auth/google

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc google auth callback
// @route  GET /auth/google/callback

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// @desc logout user
// @route  GET /auth/logout
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
