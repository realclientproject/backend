import mongoose from "mongoose";
const { Schema, model } = mongoose;

const SubjectSchema = new Schema(
  {
    description: {
      type: String,
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
    collection: "subjects",
  }
);

const SubjectModel = model("SubjectModel", SubjectSchema);
export default SubjectModel;
