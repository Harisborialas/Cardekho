import express from "express";
import Car from "../model/cars.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Car.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const category = new Car({
    color: req.body.color,
    model: req.body.model,
    make: req.body.make,
    registrationNo: req.body.registrationNo,
  });

  try {
    const newCategory = await category.save();
    const categories = await Car.find(); // Fetch the updated categories
    res.status(201).json(categories); // Return the updated categories in the response
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedCategory = await Car.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const categories = await Car.find(); // Fetch the updated categories
    res.json(categories); // Return the updated categories in the response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router };
