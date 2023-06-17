import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import moment from "moment";
import User from "./user_model.js";
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
    StartDate: {
      type: Date,
      default: Date.now,
    },
    DueDate: {
      type: Date,
    },
    // User: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "subscriptions",
  }
);
// SubscriptionSchema.pre(["find", "findOne", "findOneAndUpdate"], function () {
//   this.populate(
//     "User",
//     "_id FirstName LastName Email Phone createdAt updatedAt"
//   );
// });
SubscriptionSchema.pre("save", function (next) {
  if (!this.DueDate) {
    this.DueDate = moment(this.StartDate).add(1, "year");
  }
  next();
});

SubscriptionSchema.plugin(mongoosePaginate);
const Subscription = model("Subscription", SubscriptionSchema);
export default Subscription;
