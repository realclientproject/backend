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
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    subject_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubjectModel",
      },
    ],
  },
  {
    collection: "resources",
  }
);

resourceSchema.pre(["find", "findOne"], function () {
  this.populate("admin_id").populate("subject_id");
});

const ResourceModel = model("ResourceModel", resourceSchema);
export default ResourceModel;
