import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
import mongoosePaginate from 'mongoose-paginate-v2';
import Subscription from "./subscription_model.js";
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: true,
      trim: true,
    },
    LastName: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
      unique: true,
    },
    Phone: {
      type: Number,
      required: true,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
      trim: true,
    },
    Image: {
      type: String,
      trim: true,
    },
    isSubscribed: Boolean,
    token: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
  }
);
UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
UserSchema.plugin(mongoosePaginate);
UserSchema.pre('findOneAndUpdate', function() {
  this.$where = { isDeleted: false };
});
UserSchema.post('findOneAndDelete', async function(next) {
  const subscription = await Subscription.findOneAndDelete(this.Subscription).exec();
  next();
});
const User = model("User", UserSchema);
export default User;
