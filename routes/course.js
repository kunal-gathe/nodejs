const express = require("express");
const router = express.Router();
const { Course, validateCourse } = require("../models/courseModel");
const { Category } = require("../routes/categories");
router.get("/", async (req, res) => {
  let course = await Course.find();
  res.send(course);
});

router.post("/", async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(404).send("Not found");

  const course = new Course({
    title: req.body.name,
    category: {
      _id: category._id,
      name: category.name,
    },
    creator: req.body.creator,
    rating: req.body.rating,
  });
  await course.save();
  res.send(course);
});

router.put("/:id", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(404).send("Not found");

  const course = await Course.findByIdAndUpdate(req.params.id, {
    title: req.body.name,
    category: {
      _id: category._id,
      name: category.name,
    },
    creator: req.body.creator,
    rating: req.body.rating,
  });
  if (!course) return res.status(404).send("Not found");
  res.send(course);
});

router.delete("/:id", async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);
  if (!course) return res.status(404).send("Not found");
  res.send(course);
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).send("Not found");
  res.send(course);
});

module.exports = router;
