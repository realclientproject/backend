import mongoose from "mongoose";
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
      type: Number,
      required: true,
    },
    media: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
 
 
    lang: {
      type: String,
      required: true,
      enum: ["French", "Arabic","English"], 
    },
    grade: {
      type: String,
      required: true,
      enum: ["kg1","kg2","kg3","grade1", "grade2","grade3","grade4","grade5","grade6","grade7","grade8","grade9","grade10","grade11","grade12"], 

    },
 
    
  },
  {
    collection: "resources",
  }
);

// resourceSchema.pre(["find", "findOne"], function () {
//   this.populate("admin_id").populate("subject_id");
// });

const ResourceModel = model("ResourceModel", resourceSchema);
export default ResourceModel;
