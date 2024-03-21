import mongoose from "mongoose";

const donateSchema = new mongoose.Schema(
    {
        donateName: {
            type: String,
            required: true,
        },
        donateAmount: {
            type: Number,
            required: true,
        },
        donatePoints: {
            type: Number,
            required: true,
        },
        donateDetails: {
            type: String,
            required: true,
        },
    }
);

const Donate = mongoose.model("Donate", donateSchema);

export default Donate;