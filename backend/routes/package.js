import { Router } from "express";
import Package from "../models/Package.js";

const router = Router();

router.post("/add", async (req, res) => {
    const { requestid, userid, package_no, price, description, details, isPurchased} = req.body;
    
    try {
      
      const item = new Package();
      item.requestid = requestid;
      item.userid = userid;
      item.package_no = package_no;
      item.price = price;
      item.description = description;
      item.details = details;
      item.isPurchased = isPurchased;
  
      await item.save();
  
      res.json({ msg: "Package added successfully..." });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  router.get("/", async (req, res) => {
    try {
      const packages = await Package.find(); 
      res.json(packages);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  router.get("/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const packages = await Package.find({ userid: userId });
  
      res.json(packages);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

router.post("/check-fields", async (req, res) => {
  try {
    const { userid, id } = req.body;
    const record = await Package.findOne({ userid:userid, _id:id });

    if (record) {
      res.json({ message: "Record exists.", status: true, data: record });
    } else {
      res.json({ message: "Record does not exist.", status: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/packages/:packageId", async (req, res) => {
  const packageId = req.params.packageId;

  try {
    // Find the package by its ID
    const singlePackage = await Package.findById(packageId);

    if (!singlePackage) {
      return res.status(404).json({ error: "Package not found" });
    }

    // Update the isPurchased field to true
    singlePackage.isPurchased = true;

    // Save the updated package
    await singlePackage.save();

    return res.json(singlePackage);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;