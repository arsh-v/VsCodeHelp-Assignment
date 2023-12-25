// Temporary middleware to check if the user is an admin

const isAdmin = (req, res, next) => {
  if (
    req.query.admin === "true" &&
    req.query.secret === process.env.ADMIN_SECRET
  ) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = isAdmin;
