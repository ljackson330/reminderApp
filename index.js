require('dotenv').config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const flash = require('connect-flash');
const { ensureAuthenticated, isAdmin } = require("./middleware/checkAuth");

const app = express();

app.use(flash());

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

app.use((req, res, next) => {
    res.locals.authenticated = req.isAuthenticated();
    res.locals.isAdmin = req.user && req.user.role === 'admin';
    next();
});

// Register and login routes
app.get("/register", authController.register);
app.get("/login", authController.login);
app.get("/logout", authController.logout);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);

// reminder routes
app.get("/reminders", reminderController.list);
app.get("/reminder/new", reminderController.new);
app.get("/reminder/:id", reminderController.listOne);
app.get("/reminder/:id/edit", reminderController.edit);
app.post("/reminder/", reminderController.create);
app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

// passport authentication middleware
app.post("/login", passport.authenticate('local', {
    successRedirect: '/reminders',
    failureRedirect: '/login',
    failureFlash: true
}));

// admin routes
app.get("/admin/sessions", ensureAuthenticated, isAdmin, authController.viewSessions);
app.post("/admin/sessions/delete/:sessionId", ensureAuthenticated, isAdmin, authController.deleteSession);

app.use((req, res, next) => {
    console.log(`User details are: `);
    console.log(req.user);

    console.log("Entire session object:");
    console.log(req.session);

    console.log(`Session details are: `);
    console.log(req.session.passport);
    next();
});

app.listen(8080, function () {
    console.log(
        "Server running. Visit: http://localhost:8080/reminders in your browser 🚀"
    );
});
