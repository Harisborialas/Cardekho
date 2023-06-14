import express from "express";
import Category from "../model/Category.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const newCategory = await category.save();
    const categories = await Category.find(); // Fetch the updated categories
    res.status(201).json(categories); // Return the updated categories in the response
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const categories = await Category.find(); // Fetch the updated categories
    res.json(categories); // Return the updated categories in the response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router };
