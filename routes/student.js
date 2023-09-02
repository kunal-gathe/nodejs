const express = require("express");
const joi = require("joi");
const mongoose = require("mongoose");
const router = express.Router();

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 1 },
  enrolled: { type: Boolean, default: false },
  phone: { type: Number, required: true, minlength: 10 },
});

const Student = mongoose.model("student", studentSchema);

router.get("/api/student", async (req, res) => {
  let student = await Student.find();
  res.send(student);
});

router.post("/api/student", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const student = new Student({
    name: req.body.name,
    enrolled: req.body.enrolled,
    Phone: req.body.phone,
  });
  await student.save();
  res.send(student);
});

router.put("/:id", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, enrolled: req.body.enrolled },
    { new: true }
  );
  if (!student) return res.status(404).send("Not found");
  res.send(student);
});

router.delete("/:id", async (req, res) => {
  const student = await Student.findByIdAndRemove(req.params.id);
  if (!student) return res.status(404).send("Not found");
  res.send(student);
});

router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).send("Not found");
  res.send(student);
});

function validateData(student) {
  const schema = {
    name: joi.string().min(3).max(30).required(),
    phone: joi.string().min(10).max(30).required(),
    enrolled: joi.boolean(),
  };
  return joi.validate(student, schema);
}

module.exports = router;
