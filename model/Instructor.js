const mongoose = require("mongoose");
const { Schema } = mongoose;

const instructorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageUrl: { type: String },
});

const virtual = instructorSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
instructorSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Instructor = mongoose.model("Instructor", instructorSchema);
