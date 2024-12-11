import express, { text } from "express";
import Cafe from "../models/cafe.js";

const router = express.Router();

// GET: Retrieve all cafes from MongoDB (/cafe)
router.get("/", async (req, res) => {
      const cafe = await Cafe.find(); // Fetch all cafes from the database
      res.json(cafe);
  });

  // GET: Retrieve a specific cafe by ID (/cafe/:id)
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const cafe = await Cafe.findById(id); // Fetch the cafe by its ID
    res.json(cafe);
    
  });

// POST: Add a new cafe to MongoDB
router.post("/", async (req, res) => {
    const { text, sender } = req.body;
    const newCafe = new Cafe({ text, sender }); // Create a new cafe instance
  
    try {
      const savedCafe = await newCafe.save(); // Save the cafe to the database
      res.status(201).json({ cafe: 'Cafe added successfully!', cafedata: savedCafe });
    } catch (err) {
      res.status(400).json({ cafe: 'Error adding cafe', error: err.cafe });
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
    } catch (err) {
      res.status(400).json({ cafe: 'Error updating Cafe', error: err.cafe });
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
    } catch (err) {
      res.status(400).json({ cafe: 'Error deleting caef', error: err.cafe });
    }
  });

export default router;
