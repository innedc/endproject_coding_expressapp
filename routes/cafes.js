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

// POST: Add a new cafe to MongoDB
// backend/routes/cafes.js
router.post('/', async (req, res) => {
  try {
    // Ensure you receive the correct data from req.body
    console.log(req.body);  // Log the incoming data to check what you're getting

    const newCafe = new Cafe(req.body);
    await newCafe.save();
    res.status(201).json({ message: 'Cafe added successfully', cafe: newCafe });
  } catch (error) {
    console.error("Error adding cafe:", error);  // Log the error for debugging
    res.status(500).json({ message: 'Error adding cafe', error: error.message });
  }
});


// PUT: Update an existing cafe in MongoDB by ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { text, sender } = req.body;
  
    try {
      const updatedCafe = await Cafe.findByIdAndUpdate(
        id,
        { text, sender }, // Update fields
        { new: true } // Return the updated document
      );
  
      if (updatedCafe) {
        res.json({ cafe: 'Cafe updated successfully!', cafedata: updatedCafe });
      } else {
        res.status(404).json({ cafe: 'Cafe not found!' });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

// DELETE: Remove a cafe from MongoDB by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedCafe = await Cafe.findByIdAndDelete(id); // Find and delete the cafe by ID
      if (deletedCafe) {
        res.json({ cafe: 'Cafe deleted successfully!' });
      } else {
        res.status(404).json({ cafe: 'Cafe not found!' });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

export default router;
