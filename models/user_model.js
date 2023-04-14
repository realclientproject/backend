import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
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
  },
  {
    timestamps: true,
  },
  {
    collection: "users",
  }
);
UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
const User = model("User", UserSchema);
export default User;
