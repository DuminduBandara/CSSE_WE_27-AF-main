import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
    packageId:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
})

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;