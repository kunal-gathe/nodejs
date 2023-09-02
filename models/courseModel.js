const joi = require("joi");
const mongoose = require("mongoose");
const {categorySchema} = require('../routes/categories')

const Course = mongoose.model(
  "Course",
  mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    category: {
        type: categorySchema,
        required: true
    },
    creator: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  })
);
function validateCourse(course) {
  const schema = {
    title: joi.string().min(5).max(50).required(),
    category: joi.string().required(),
    creator: joi.string().min(5).required(),
    rating: joi.number().min(0).required(),
  };
  return joi.validate(course, schema);
}

exports.Course = Course;
exports.validateCourse = validateCourse;
