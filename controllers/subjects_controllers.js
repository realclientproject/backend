import express from "express";
import subjectModel from "../models/subjects_model.js";

function getAll(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const skipIndex = (page - 1) * limit;

  subjectModel
    .find({})
    .sort({ _id: 1 })
    .skip(skipIndex)
    .limit(limit)
    .then((response) => {
      res.status(200).send({ success: true, response });
    })
    .catch((err) => {
      next(err);
    });
}

function getById(req, res, next) {
  let id = req.params.id;
  subjectModel
    .findById(id)
    .then((response) => {
      if (!response) {
        return res
          .status(404)
          .send({ success: false, message: "subject not found" });
      }
      res.status(200).send({ success: true, response });
    })
    .catch((err) => {
      next(err);
    });
}

function add(req, res, next) {
  let addsubject = new subjectModel(req.body);
  addsubject
    .save()
    .then((response) =>
      res.status(200).send({ success: true, response: response })
    )
    .catch((err) => {
      res.status(400).send(err);
    });
}

function Delete(req, res, next) {
  let i = req.params.id;
  subjectModel
    .findByIdAndRemove({ _id: i })
    .exec()
    .then((response) => {
      res.status(200).send({ success: true, response });
    })
    .catch((err) => {
      return next(err);
    });
}

function Update(req, res, next) {
  let id = req.params.id;
  let body = req.body;
  subjectModel
    .findOneAndUpdate({ _id: id }, { $set: body }, { new: true })
    .exec()
    .then((response) => {
      res.status(200).send({ success: true, response });
    })
    .catch((err) => {
      return next(err);
    });
}

const subject_controller = { getAll, add, Delete, Update, getById };
export default subject_controller;
