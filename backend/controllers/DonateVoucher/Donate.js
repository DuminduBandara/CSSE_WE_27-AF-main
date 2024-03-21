const Donate = require("../../models/DonateVoucher/donate.js");

exports.addDonate = async (req, res) => {
  try {
    const donateName = req.body.donateName;
    const donatePoints = req.body.donatePoints;
    const donateAmount = req.body.donateAmount;
    const donateDetails = req.body.donateDetails;

    const newDonate = new Donate({
      donateName,
      donatePoints,
      donateAmount,
      donateDetails,
    });

    await newDonate.save();
    res.json("Donation Added");
  } catch (err) {
    console.log(err);
  }
};

exports.getDonate = async (req, res) => {
  try {
    const donates = await Donate.find();
    res.json(donates);
  } catch (err) {
    console.log(err);
  }
};

exports.getDonateById = async (req, res) => {
  try {
    const donates = await Donate.findById(req.params.id);
    res.json(donates);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteDonate = async (req, res) => {
  try {
    await Donate.findByIdAndDelete(req.params.id);
    res.json("Donation Deleted");
  } catch (err) {
    console.log(err);
  }
};
