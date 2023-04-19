import UserModel from "../models/user_model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class User {
  async getAllUsers(req, res, next) {
    try {
      const { page, limit } = req.query;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 20,
      };
      const response = await UserModel.paginate({}, options);
      return res.status(200).send({ success: true, response });
    } catch (err) {
      next(err);
    }
  }

  async getUser(req, res, next) {
    try {
      let { id } = req.params;
      var validId = mongoose.Types.ObjectId.isValid(id);
      console.log(validId);
      if (!validId) {
        return res.status(400).send({ status: 400, message: "invalid id" });
      }
      const response = await UserModel.find({ _id: id });
      return res.status(200).send({ success: true, response });
    } catch (err) {
      next(err);
    }
  }

  async editUser(req, res, next) {
    try {
      let filter = req.params.id;
      let update = req.body;
      const response = await UserModel.findOneAndUpdate(filter, update, {
        new: true,
      });
      return res.status(200).send({ success: true, response });
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      let { id } = req.params;
      const response = await UserModel.findByIdAndDelete({ _id: id });
      return res.status(200).send({ success: true, response });
    } catch (err) {
      next(err);
    }
  }

  async addUser(req, res, next) {
    try {
      const { FirstName, LastName, Email, Password, Phone } = req.body;
      if (!(Email && Password && FirstName && LastName && Phone)) {
        // console.log("error", req.body.FirstName);
        res.status(400).send("All inputs are required");
      }

      const oldUser = await UserModel.findOne({ Email });
      if (oldUser) {
        return res.status(409).send("User Already Exists. Please Login");
      } else {
        let encryptedUserPassword = await bcrypt.hash(Password, 10);
        const user = await UserModel.create({
          FirstName: FirstName,
          LastName: LastName,
          Email: Email.toLowerCase(),
          Password: encryptedUserPassword,
          Phone: Phone,
        });

        const token = jwt.sign(
          { user_id: user._id, Email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "5h",
          }
        );
        user.token = token;

        res.status(201).json(user);
      }
    } catch (error) {
      if (error) return next(error);
      return res.status(400).send(`Error: ${error}`);
    }
  }

  async login(req, res, next) {
    try {
      const { Email, Password } = req.body;

      if (!(Email && Password)) {
        res.status(400).send("All input is required");
      }
      const user = await UserModel.findOne({ Email });

      if (user && (await bcrypt.compare(Password, user.Password))) {
        const token = jwt.sign(
          { user_id: user._id, Email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "5h",
          }
        );

        user.token = token;

        return res.cookie("token", token).status(200).json(user);
      }
    } catch (error) {
      if (error) return next(error);
      return res.status(400).send(`Error: ${error}`);
    }
  }

  async logout(req, res, next) {
    try {
      res
        .clearCookie("token")
        .status(200)
        .send({ status: 200, message: "Logged Out!" });
    } catch (error) {
      if (error) return next(error);
      return res.status(400).send(`Error: ${error}`);
    }
  }
}

const UserController = new User();
export default UserController;
