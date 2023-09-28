const UserModel = require("../models/userModels");
const jwt = require("jsonwebtoken");

const max = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "token", { expiresIn: max });
};

const handleErros = (err) => {
  let errors = { email: "", password: "" };

  if (err.message == "Incorrect email")
    errors.email = "This email isnot registered";
  if (err.message == "Incorrect password")
    errors.password = "Incorrect password";

  if (err.code === 11000) {
    errors.email = "Email already registered";
    return errors;
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httponly: false,
      maxAge: max * 1000,
    });
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErros(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.login( email, password );
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httponly: false,
      maxAge: max * 1000,
    });
    res.status(200).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErros(err);
    res.json({ errors, created: false });
  }
};
