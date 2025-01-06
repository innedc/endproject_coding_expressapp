import express from "express";
import Cafe from "../models/cafe.js";

const router = express.Router();

// GET: Retrieve all cafes from MongoDB (/cafes)
router.get('/', async (req, res) => {
  try {
    const cafes = await Cafe.find(); // Fetch all cafes from the database
    const cafesWithFullImageUrl = cafes.map((cafe) => ({
      ...cafe._doc, // Spread the cafe document
      picture: `https://endproject-coding.onrender.com/pictures/${cafe.picture}` // Full URL to the picture
    }));
    res.json(cafesWithFullImageUrl); // Send the updated data with the full image URLs
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching cafes' });
  }
});

// POST: Add a new cafe to MongoDB
router.post('/', async (req, res) => {
  try {
    const { title, location, price, hours } = req.body;

    // Ensure the data exists in the request body
    if (!title || !location || !price || !hours) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    // Create a new instance of Cafe model
    const newCafe = new Cafe({ title, location, price, hours });

    // Save to MongoDB
    await newCafe.save();
    
    res.status(201).json({ message: 'Cafe added successfully!', cafe: newCafe });
  } catch (error) {
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
