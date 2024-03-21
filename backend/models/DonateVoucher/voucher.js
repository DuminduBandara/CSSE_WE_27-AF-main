import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
    {
        voucherName: {
            type: String,
            required: true,
        },
        voucherPoints: {
            type: Number,
            required: true,
        },
        voucherCode: {
            type: String,
            required: true,           
        },
        voucherDetails: {
            type: String,
            required: true,
        },
    }
)

const Voucher = mongoose.model("Vocher", voucherSchema);

export default Voucher;