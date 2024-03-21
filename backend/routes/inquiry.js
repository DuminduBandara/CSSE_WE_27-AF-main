import express from "express";
import Inquiry from "../models/Inquiry.js";

const router = express.Router();

// Create a new inquiry
router.post("/inquiries", async (req, res) => {
  try {
    const { userId, inquiryType, packageId, inquiryTitle, inquiryDescription } = req.body;
    const inquiry = new Inquiry({ userId, inquiryType, packageId, inquiryTitle, inquiryDescription });
    const savedInquiry = await inquiry.save();
    res.status(201).json(savedInquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all inquiries
router.get("/inquiries", async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  
  router.get("/inquiries/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const inquiries = await Inquiry.find({ userId: userId });
  
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  


// Get a specific inquiry
router.get("/inquiries/:id", async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found" });
    }
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an inquiry
router.put("/inquiries/:id", async (req, res) => {
  try {
    const { userId, inquiryType, packageId, inquiryTitle, inquiryDescription, addedDate } = req.body;
    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { userId, inquiryType, packageId, inquiryTitle, inquiryDescription, addedDate },
      { new: true }
    );
    if (!updatedInquiry) {
      return res.status(404).json({ error: "Inquiry not found" });
    }
    res.json(updatedInquiry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put("/inquiries/:inquiryId/resolve", async (req, res) => {
    try {
      const { inquiryId } = req.params;
      const inquiry = await Inquiry.findById(inquiryId);
      
      if (!inquiry) {
        return res.status(404).json({ error: "Inquiry not found" });
      }
  
      inquiry.isResolved = !inquiry.isResolved; // Toggle the value of isResolved field
      await inquiry.save();
  
      res.json(inquiry);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  

// Delete an inquiry
router.delete("/inquiries/:id", async (req, res) => {
  try {
    const deletedInquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!deletedInquiry) {
      return res.status(404).json({ error: "Inquiry not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
