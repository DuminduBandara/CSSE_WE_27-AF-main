import mongoose from "mongoose";
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    userid: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    districts: {
      type: [String],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    days: {
      type: Number,
      // required: true,
    },
  });
  
  const Request = mongoose.model('Request', requestSchema);
  
  export default Request;