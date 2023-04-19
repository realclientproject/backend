import mongoose from "mongoose";
import Admin from "./admin_model.js"; 

const { Schema, model } = mongoose;

const resourceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Lesson", "quiz"], 
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  media:{
    type:String,
    required:true,
  },
      count: {
      type: Number,
      required: true,
    },
    admin_id: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    subject_id: [
      {
        type:Schema.Types.ObjectId,
        ref: "SubjectModel",
      },
    ],
  },
  {
    collection: "resources",
  }
);

resourceSchema.pre(["find", "findOne"], function () {
  this.populate([ "subject_id"]);
});

const resourceModel = model("resourceModel", resourceSchema);
export default resourceModel;
