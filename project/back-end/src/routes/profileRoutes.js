// Express, Router, Multer, Path සහ FS import කරනවා
const express = require("express");
const router = express.Router(); // Express router object
const multer = require("multer"); // Image upload handle කරන්න
const path = require("path");     // File path handle කරන්න
const fs = require("fs");         // File system (folder create/check)  

// Profile model import කරනවා (MongoDB schema)
const Profile = require("../models/UserProfile");

console.log("Profile routes loaded");
// ---------------- Multer setup ----------------
// File upload storage define කරනවා
const storage = multer.diskStorage({
  // Uploaded files save කරන folder
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir); // folder එකක් නැත්තම් create කරනවා
    cb(null, dir); // folder path assign කරනවා
  },
  // File name unique කරන්න
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname); // timestamp + original extension
    cb(null, file.fieldname + "-" + uniqueSuffix); // final file name
  },
});

// Multer middleware create
const upload = multer({ storage });

// ---------------- GET route ----------------
// GET profile by userId
router.get("/:userId", async (req, res) => {
  try {
    // MongoDB එකෙන් userId එකට profile fetch කරනවා
    const profile = await Profile.findOne({
         userId: req.params.userId
        });
    // Profile object client එකට return කරනවා JSON ලෙස
    res.json(profile);
  } catch (err) {
    // Error වුණොත් 500 Server Error return කරනවා
    res.status(500).json({ 
        error: "Server error" 
    });
  }
});

// ---------------- POST route ----------------
// CREATE or UPDATE profile
// upload.single("image") → form එකේ 'image' field එක handle කරනවා
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Form data extract කරනවා
    const { userId, name, phone, location } = req.body;
    if (!userId)
         return res.status(400).json({
         error: "UserId is required" 
        }); // userId නැති නම් 400

    // Uploaded image path එක
    const imagePath = req.file ? `uploads/${req.file.filename}` : undefined;

    // MongoDB එකෙන් profile already තියෙනද බලනවා
    let profile = await Profile.findOne({ userId });
    if (profile) {
      // Profile තියෙනවා නම් update කරනවා
      profile.name = name;
      profile.phone = phone;
      profile.location = location;
      if (imagePath) profile.image = imagePath; // new image upload වුනොත් update කරනවා
      await profile.save(); // Save changes
    } else {
      // Profile නැත්තම් create කරනවා
      profile = new Profile({
        userId,
        name,
        phone,
        location,
        image: imagePath,
      });
      await profile.save(); // Save new profile
    }

    // Saved profile object return කරනවා client එකට
    res.json(profile);
  } catch (err) {
    console.error(err); // Error console log
    res.status(500).json({ error: "Server error" });
  }
});

// Export router, server.js එක use කරන්න
module.exports = router;
