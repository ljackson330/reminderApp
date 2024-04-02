let database = require("../database");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

let authController = {
  login: (req, res) => {
    res.render("auth/login", { message: req.flash('error') });
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement later
  },

  registerSubmit: (req, res) => {
    // implement later
  },
};

module.exports = authController;
