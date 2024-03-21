import mongoose from "mongoose";

const Schema = mongoose.Schema;

const packageSchema = new Schema({
    requestid:{
        type: String,
        required: true
    },
    userid:{
        type: String,
        required: true
    },
    package_no:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    details:{
        type: String,
        required: true
    },
    isPurchased:{
        type: Boolean,
        default: false
    }
})

const Package = mongoose.model("Package", packageSchema);
export default Package;