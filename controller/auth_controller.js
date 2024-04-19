const passport = require("../middleware/passport");
const userModel = require("../models/userModel").userModel;

let authController = {
  login: (req, res) => {
    res.render("auth/login", { message: req.flash('error') });
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/reminders");
      });
    })(req, res, next);
  },

  registerSubmit: (req, res) => {
    const { name, email, password } = req.body;

    // validate user input
    if (!name || !email || !password) {
      req.flash('error', 'All fields are required.');
      return res.redirect('/register');
    }

    // check if user with the same email already exists
    const existingUser = userModel.findOne(email);
    if (existingUser) {
      req.flash('error', 'Email is already registered.');
      return res.redirect('/register');
    }

    // create a new user object
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      name: name,
      email: email,
      password: password,
      role: 'user',
      reminders: []
    };

    // add the new user to the database
    userModel.addUserToDatabase(newUser);

    // redirect the user to the login page after successful registration
    res.redirect('/login');
  },

  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error("Error occurred during logout:", err);
      }
      // redirect to the login page after logout
      res.redirect("/login");
    });
  },


  viewSessions: (req, res) => {
    // get the list of sessions from the session store
    const sessions = req.sessionStore.sessions;

    // create an array to store session information
    const sessionList = [];

    // iterate over sessions and extract relevant information
    for (const [sessionId, sessionData] of Object.entries(sessions)) {
      const userName = (sessionData.passport && sessionData.passport.user) ? sessionData.passport.user.name : 'Unknown';
      sessionList.push({ sessionId, userName, sessionData });
    }

    // render the view sessions page with the session data
    res.render("auth/sessions", { sessionList });
  },

  deleteSession: (req, res) => {
    const sessionId = req.params.sessionId;

    // destroy the session using the session ID
    req.sessionStore.destroy(sessionId, (err) => {
      if (err) {
        console.error("Error deleting session:", err);
        req.flash("error", "Failed to delete session");
      } else {
        req.flash("success", "Session deleted successfully");
      }
      res.redirect("/admin/sessions");
    });
  },
};

module.exports = authController;
