import Place from "../models/Places/Places";
import cloudinary2 from "cloudinary";

const UploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  const imageUploaded = new Place({
    placeName: req.body.placeName,
    province: req.body.province,
    district: req.body.district,
    description: req.body.description,
    image: result.secure_url,
  });

  try {
    await imageUploaded.save();
  } catch (error) {
    return res.status(400).json({
      message: `image upload failed, check to see the ${error}`,
      status: "error",
    });
  }
};

export { UploadImage };
