import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    // packageID: {
    //   type: String,
    //   required: true,
    // },
    cardName: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    expDate: {
      type: String,
      required: true,
    },
    cvv: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
