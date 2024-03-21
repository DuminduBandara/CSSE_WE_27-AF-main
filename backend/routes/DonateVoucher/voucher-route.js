import {Router} from "express";
import Voucher from "../../models/DonateVoucher/voucher.js";

const router = Router();

//add voucher
router.route("/add").post((req, res) => {
    const voucherName = req.body.voucherName;
    const voucherPoints = req.body.voucherPoints;
    const voucherCode = req.body.voucherCode;
    const voucherDetails = req.body.voucherDetails;
  
    const newVoucher = new Voucher({
      voucherName,
      voucherPoints,
      voucherCode,
      voucherDetails,
    });
  
    newVoucher
      .save()
      .then(() => {
        res.json("voucher Added");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  //get all vouchers
  router.route("/").get((req, res) => {
    const vouchers = Voucher.find()
    .then((vouchers) => {
        res.json(vouchers)
    })
    .catch((err) => {
        console.log(err);
      });
  })
  
  //get specific voucher
  router.route("/:id").get((req, res) => {
      const vouchers = Voucher.findById(req.params.id)
          .then((vouchers) => {
          res.json(vouchers);
          })
          .catch((err) => {
          console.log(err);
          });
      }
  );

  //delete voucher
  router.route("/:id").delete((req, res) => {
    Voucher.findByIdAndDelete(req.params.id)
      .then(() => {
        res.json("Voucher Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // Update a voucher by ID
router.put('/update/:id', (req, res) => {
  const { voucherName, voucherPoints, voucherCode, voucherDetails } = req.body;

  Voucher.findByIdAndUpdate(
    req.params.id,
    {
      voucherName,
      voucherPoints,
      voucherCode,
      voucherDetails,
    },
    { new: true }
  )
    .then((updatedVoucher) => {
      if (!updatedVoucher) {
        return res.status(404).json({ error: 'Voucher not found' });
      }

      res.json(updatedVoucher);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Server error' });
    });
});

    

  export default router;