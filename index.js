const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const { getUserByEmailIdAndPassword, getUserById } = require("./controller/user_controller");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    function(email, password, done) {
        const user = getUserByEmailIdAndPassword(email, password);
        if (!user) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }
        return done(null, user);
    }
));

// Serialize and deserialize user
passport.serializeUser(function(user, done) {
    done(null, user.id); // Assuming user object has an 'id' field
});

passport.deserializeUser(function(id, done) {
    const user = getUserById(id);
    if (!user) {
        return done(null, false);
    }
    return done(null, user);
});

// Routes start here
app.get("/reminders", reminderController.list);
app.get("/reminder/new", reminderController.new);
app.get("/reminder/:id", reminderController.listOne);
app.get("/reminder/:id/edit", reminderController.edit);
app.post("/reminder/", reminderController.create);
// ⭐ Implement these two routes below!
app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

// 👌 Ignore for now
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);

app.post("/login", passport.authenticate('local', {
    successRedirect: '/reminders', // Redirect to reminders page after successful login
    failureRedirect: '/login', // Redirect back to login page after failed login
    failureFlash: true // Enable flashing error messages
}));

app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});

app.listen(3001, function () {
  console.log(
    "Server running. Visit: http://localhost:3001/reminders in your browser 🚀"
  );
});
