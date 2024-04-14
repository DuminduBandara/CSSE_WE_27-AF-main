import mongoose from "mongoose";

const Schema = mongoose.Schema;

const inquirySchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    inquiryType: {
        type: String,
        required: true
    },
    packageId: {
        type: String,
    },
    inquiryTitle: {
        type: String,
        required: true
    },
    inquiryDescription: {
        type: String,
        required: true
    },
    addedDate: {
        type: Date,
        default: Date.now
    },
    isResolved: {
        type: Boolean,
        default: false
    }
})

const Inquiry = mongoose.model("Inquiry", inquirySchema);
export default Inquiry;