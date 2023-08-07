const { Instructor } = require("../model/Instructor");

exports.fetchInstructorById = async (req, res) => {
  const { id } = req.params;
  try {
    const instructor = await Instructor.findById(id, "name email id").exec();
    res.status(200).json(instructor);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateInstructor = async (req, res) => {
  const { id } = req.params;
  try {
    const instructor = await Instructor.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(instructor);
  } catch (err) {
    res.status(400).json(err);
  }
};
