import express, { text } from "express";
import user from "../models/user.js";

const router = express.Router();

// GET: Retrieve all user from MongoDB (/user)
router.get("/", async (req, res) => {
      const user = await user.find(); // Fetch all user from the database
      res.json(user);
  });

  // GET: Retrieve a specific user by ID (/user/:id)
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await user.findById(id); // Fetch the user by its ID
    res.json(user);
    
  });

// POST: Add a new user to MongoDB
router.post("/", async (req, res) => {
    const { text, sender } = req.body;
    const newuser = new user({ text, sender }); // Create a new user instance
  
    try {
      const saveduser = await newuser.save(); // Save the user to the database
      res.status(201).json({ user: 'user added successfully!', userdata: saveduser });
    } catch (err) {
      res.status(400).json({ user: 'Error adding user', error: err.user });
    }
  });

// PUT: Update an existing user in MongoDB by ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { text, sender } = req.body;
  
    try {
      const updateduser = await user.findByIdAndUpdate(
        id,
        { text, sender }, // Update fields
        { new: true } // Return the updated document
      );
  
      if (updateduser) {
        res.json({ user: 'user updated successfully!', userdata: updateduser });
      } else {
        res.status(404).json({ user: 'user not found!' });
      }
    } catch (err) {
      res.status(400).json({ user: 'Error updating user', error: err.user });
    }
  });

// DELETE: Remove a user from MongoDB by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleteduser = await user.findByIdAndDelete(id); // Find and delete the user by ID
      if (deleteduser) {
        res.json({ user: 'user deleted successfully!' });
      } else {
        res.status(404).json({ user: 'user not found!' });
      }
    } catch (err) {
      res.status(400).json({ user: 'Error deleting user', error: err.user });
    }
  });

export default router;
