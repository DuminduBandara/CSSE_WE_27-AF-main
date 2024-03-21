import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    name : {
        type : String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    subject:{
        type:String,
        required:true
    },
    feedbackmsg:{
        type:String,
        required:true
    }
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

export default Feedback;