import mongoose from "mongoose";

const pointsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    pointAmount: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

const Points = mongoose.model("Points", pointsSchema)

export default Points;