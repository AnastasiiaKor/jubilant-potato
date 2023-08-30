const { Admin } = require("../models/admin");
const { ctrlWrapper, HttpError } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Registration succeeded" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw HttpError(404, "Wrong password or username");
  }
  const check = await bcrypt.compare(password, admin.password);
  if (!check) {
    throw HttpError(404, "Wrong password or username");
  }
  const payload = { id: admin.id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await Admin.findByIdAndUpdate(admin.id, { token });

  res.status(200).json(token);
};

const logout = async (req, res) => {
  const { id } = req.admin;
  await Admin.findByIdAndUpdate(id, { token: null });
  res.status(204).json();
};

const checkAdmin = async (req, res) => {
  res.status(200).json({ message: "Token is valid" });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  checkAdmin: ctrlWrapper(checkAdmin),
};
