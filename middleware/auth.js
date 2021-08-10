exports.ensureAuthenticated = (req, res, next)=> {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Login to view this resource");
    res.redirect("/auth/login");
    next();
  }
