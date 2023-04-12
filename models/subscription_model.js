import mongoose, { Collection } from "mongoose";
import User from "./user_model";
const { Schema, model } = mongoose;

const SubscriptionSchema = new Schema(
  {
    Description: {
      type: String,
      required: true,
      trim: true,
    },
    Payment: {
      type: Number,
      required: true,
    },
    DueDate: {
      type: Date,
      required: true,
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
  },
  {
    timestamps: true,
  },
  {
    collection: "subscriptions",
  }
);
const Subscription = model("Subscription", SubscriptionSchema);
export default Subscription;
