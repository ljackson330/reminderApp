module.exports = {
  // Middleware to check if the user is authenticated
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  },

  // Middleware to check if the user is an admin
  isAdmin: function (req, res, next) {
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    res.status(403).send('Forbidden');
  }
};
