const express = require("express");
const joi = require("joi");
const mongoose = require("mongoose");
const router = express.Router();

 const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 1 },
});

const Category = mongoose.model("Category", categorySchema);

router.get("/", async (req, res) => {
  let categories = await Category.find();
  res.send(categories);
});

router.post("/", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const category = new Category({
    name: req.body.name,
  });
  await category.save();
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!category) return res.status(404).send("Not found");
  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category) return res.status(404).send("Not found");
  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("Not found");
  res.send(category);
});

function validateData(category) {
  const schema = {
    name: joi.string().min(3).required(),
  };
  return joi.validate(category, schema);
}

module.exports = router;
exports.categorySchema = categorySchema;
exports.Category = Category;
