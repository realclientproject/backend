import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema, model } = mongoose;

let validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const adminSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "first_name is required"],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "last_name is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: "password is required",
    },
    phone: {
      type: String,
      unique: [true, "already exist"],
      default: "not found",
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      default: "not found",
      ref: "SubjectModel",
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "user"],
      default: "user",
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "admin",
  }
);

adminSchema.pre("save", function (next) {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(this.password, salt))
    .then((hashPassword) => {
      this.password = hashPassword;
      next();
    })
    .catch((err) => {
      next(err);
    });
});
// adminSchema.pre("findOneAndUpdate", function () {
//   this.$where = { isDeleted: false };
// });
// UserSchema.post("findOneAndDelete", async function (next) {
//   const admin = await Admin.findOneAndDelete(
//     this.Admin
//   ).exec();
//   next();
// });
adminSchema.pre(["find", "findOne", "findOneAndUpdate"], function () {
  this.populate(
    ["subscription", "subject"]
    // "_id FirstName LastName Email Phone createdAt updatedAt"
  );
});
const Admin = model("Admin", adminSchema);
export default Admin;
