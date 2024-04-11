Breakdown of work:

March 28th:

Liam Jackson:
- I worked on and completed the functions to edit and delete existing tasks

Chrystian Kwasnik:
- I worked on and completed the functions to edit and delete existing tasks

[ ] copy everything related to session and passport from server.js

[x] install passport, express session, passport local npm install express-session passport passport-local

[ ] paste the entire middleware folder

[ ] copy user controller into controllers

[x] import database from passport into usermodel add a reminders: [] role: "user" 

[ ] get login page from passport starter code

[x] copy image from public directory

[ ] change /auth/login to /login

[ ] copy login and logout from passport starter code

[ ] replacing redirect, /auth/login

[ ] store.all, store.destroy(sid,callback)

[ ] in reminders controller if user is admin redirect to res.redirect("/admin")

- const store = req.sessionstore;
- store.all(err, session)
- object.keys(sessions)

const userController = require("../controller/user_controller");
const { getUserByEmailIdAndPassword, getUserById } = require("./controller/user_controller");