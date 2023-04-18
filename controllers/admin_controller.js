import Model from "../models/admin_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getAll(req, res, next) {
  try {
    const response = await Model.find({});
    res.status(200).send({ success: true, response });
  } catch (err) {
    next(err);
  }
}

export async function get(req, res, next) {
  try {
    const { id } = req.params;
    const response = await Model.findOne({ _id: id });
    res.status(200).send({ success: true, response });
  } catch (err) {
    next(err);
  }
}

export async function register(req, res, next) {
  try {
    const { email } = req.body;
    const doc = new Model(req.body);
    const response = await doc.save();

    const token = jwt.sign(
      { admin_id: doc._id, email, role: doc.role },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );

    res.cookie("auth_token", token, { maxAge: 5 * 60 * 60 * 1000 });
    res.status(200).send({ success: true, response });
  } catch (err) {
    if (err.code == 11000) {
      res.status(400).json("Email already exists");
    } else {
      next(err);
    }
  }
}

export async function login(req, res, next) {
  try {
    let { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json("All inputs are required");
    }
    const admin = await Model.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign(
        { admin_id: admin._id, email, role: admin.role },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );

      res.cookie("auth_token", token, { maxAge: 5 * 60 * 60 * 1000 });
      res.status(200).json(admin);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

export function logout(req, res, next) {
  try {
    res.clearCookie("auth_token");
    return res.status(200).send("logged out");
  } catch (err) {
    res.send(err.message);
  }
}

export async function del(req, res, next) {
  try {
    let { id } = req.params;
    const response = await Model.findByIdAndDelete({ _id: id });
    res.status(200).send({ success: true, response });
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    let { id } = req.params;
    let body = req.body;
    const response = await Model.findByIdAndUpdate({ _id: id }, { $set: body });
    res.status(200).send({ success: true, response });
  } catch (err) {
    next(err);
  }
}
