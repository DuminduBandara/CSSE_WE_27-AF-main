import { Router } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Place from "../../models/Places/Places.js";

const router = Router();

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are accepted!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

cloudinary.config({
  cloud_name: "dg7kcjtlu",
  api_key: "189726296272932",
  api_secret: "dMrT32-k3AGZV_6ruShFRIhGdNM",
});

router.post("/upload", upload.single("image"), async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.file.path);

  const placeName = req.body.placeName;
  const province = req.body.province;
  const district = req.body.district;
  const description = req.body.description;
  const image = result.secure_url;

  //res.secure_url

  const newPlace = {
    placeName,
    province,
    district,
    description,
    image,
  };

  const newPlaceData = new Place(newPlace);

  newPlaceData
    .save()
    .then(() => res.json("Place Added Successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/places", async (req, res) => {
  const todos = await Place.find();
  res.json(todos);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const place = await Place.findById(id);

  res.json(place);
});

router.get("/getImage/:id", async (req, res) => {
  const id = req.params.id;
  const place = await Place.findById(id);
  res.json(place.image);
});

export default router;
