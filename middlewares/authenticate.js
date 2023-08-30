const jwt = require("jsonwebtoken");
const { Admin } = require("../models/admin");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") next(HttpError(401, "Not authorized"));
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const admin = await Admin.findById(id);
    if (!admin || admin.token !== token) next(HttpError(401, "Not authorized"));
    req.admin = admin;
    next();
  } catch (err) {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
