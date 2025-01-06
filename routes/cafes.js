import express from "express";
import Cafe from "../models/cafe.js";

const router = express.Router();

// GET: Retrieve all cafes from MongoDB
router.get("/", async (req, res) => {
  try {
    const cafes = await Cafe.find();
    res.json(cafes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cafes", error });
  }
});

// GET: Retrieve a specific cafe by ID from MongoDB
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cafe = await Cafe.findById(id);
    if (cafe) {
      res.json(cafe);
    } else {
      res.status(404).json({ message: "Cafe not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cafe", error: error.message });
  }
});

// POST: Add a new cafe to MongoDB
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newCafe = new Cafe(req.body);
    await newCafe.save();
    res.status(201).json({ message: "Cafe added successfully", cafe: newCafe });
  } catch (error) {
    res.status(500).json({ message: "Error adding cafe", error: error.message });
  }
});

// PUT: Update an existing cafe in MongoDB by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { text, sender } = req.body;
  try {
    const updatedCafe = await Cafe.findByIdAndUpdate(
      id,
      { text, sender },
      { new: true }
    );
    if (updatedCafe) {
      res.json({ message: "Cafe updated successfully", cafe: updatedCafe });
    } else {
      res.status(404).json({ message: "Cafe not found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// DELETE: Remove a cafe from MongoDB by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCafe = await Cafe.findByIdAndDelete(id);
    if (deletedCafe) {
      res.json({ message: "Cafe deleted successfully" });
    } else {
      res.status(404).json({ message: "Cafe not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
