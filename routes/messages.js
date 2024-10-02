import express, { text } from "express";
import Message from "../models/message.js";

const router = express.Router();

// GET: Retrieve all messages from MongoDB (/messages)
router.get("/", async (req, res) => {
      const messages = await Message.find(); // Fetch all messages from the database
      res.json(messages);
  });

  // GET: Retrieve a specific message by ID (/message/:id)
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const message = await Message.findById(id); // Fetch the message by its ID
    res.json(message);
    
  });

// POST: Add a new message to MongoDB
router.post("/", async (req, res) => {
    const { text, sender } = req.body;
    const newMessage = new Message({ text, sender }); // Create a new message instance
  
    try {
      const savedMessage = await newMessage.save(); // Save the message to the database
      res.status(201).json({ message: 'Message added successfully!', messagedata: savedMessage });
    } catch (err) {
      res.status(400).json({ message: 'Error adding message', error: err.message });
    }
  });

// PUT: Update an existing message in MongoDB by ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { text, sender } = req.body;
  
    try {
      const updatedMessage = await Message.findByIdAndUpdate(
        id,
        { text, sender }, // Update fields
        { new: true } // Return the updated document
      );
  
      if (updatedMessage) {
        res.json({ message: 'Message updated successfully!', messagedata: updatedMessage });
      } else {
        res.status(404).json({ message: 'Message not found!' });
      }
    } catch (err) {
      res.status(400).json({ message: 'Error updating message', error: err.message });
    }
  });

// DELETE: Remove a message from MongoDB by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedMessage = await Message.findByIdAndDelete(id); // Find and delete the message by ID
      if (deletedMessage) {
        res.json({ message: 'Message deleted successfully!' });
      } else {
        res.status(404).json({ message: 'Message not found!' });
      }
    } catch (err) {
      res.status(400).json({ message: 'Error deleting message', error: err.message });
    }
  });

export default router;
