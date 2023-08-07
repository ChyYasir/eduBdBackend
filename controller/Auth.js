const { Instructor } = require("../model/Instructor");
const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const doc = await user.save();
    res.status(201).json({ id: doc.id });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    console.log({ user });
    if (!user) {
      res.status(401).json({ message: "no such user email" });
    } else if (user.password === req.body.password) {
      res.status(200).json({ id: user.id, role: user.role });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.createInstructor = async (req, res) => {
  const instructor = new Instructor(req.body);
  try {
    const doc = await instructor.save();
    res.status(201).json({ id: doc.id });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({
      email: req.body.email,
    }).exec();
    console.log({ instructor });
    if (!instructor) {
      res.status(401).json({ message: "no such instructor email" });
    } else if (instructor.password === req.body.password) {
      res.status(200).json({ id: instructor.id, role: instructor.role });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
