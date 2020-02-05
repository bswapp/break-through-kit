module.exports = (req, res, next) => {
  if (!req.session.user.is_admin) return res.status(401).send("Not Allowed");
  next();
};
