// import express from "express";
import fs from "fs";
import resourceModel from "../models/resources_model.js";

function getAll(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit = 116;
  const skipIndex = (page - 1) * limit;

  resourceModel
    .find({})
    .sort({ _id: 1 })
    // .skip(skipIndex)
    // .limit(limit)
    .then((response) => {
      res.status(200).send({ success: true, response });
    })
    .catch((err) => {
      next(err);
    });
}

function getById(req, res, next) {
  let id = req.params.id;
  resourceModel
    .findById(id)
    .then((response) => {
      if (!response) {
        return res
          .status(404)
          .send({ success: false, message: "resource not found" });
      }
      res.status(200).send({ success: true, response });
    })
    .catch((err) => {
      next(err);
    });
}




export const addResource = async (req, res, next) => {
  try {
      console.log(req.body);
      const form = new resourceModel({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        price: req.body.price,
        count: req.body.count,
        admin_id: req.body.admin_id,
        subject_id: req.body.subject_id,
        media:  req.file.path,
      });

      await form.save().then((response) => {
          if (response) {
              res.status(200).send({
                  status: 200,
                  message: "Added resource successfuly",
                  response,
              });
          }
      });
  } catch (err) {
      return next(err);
  }
};


export const updateResources = async (req, res, next) => {
  const { name, type, price, count, description, media } = req.body;
  try {
    let resource = await resourceModel.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "resource not found" });
    }
    if (resource.media) {
      fs.unlinkSync(`${resource.media}`);
    }
    resource.name = name;
    resource.type = type;
    resource.description = description;
    resource.price = price;
    resource.count = count;
    resource.name = name;
    resource.admin_id = admin_id;
    resource.subject_id = subject_id;
    resource.media = media;
    await resource.save();
    res.json(resource);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, err: err.message });
  }
};

// delete category
export const deleteResource = async (req, res) => {
  let { id } = req.params;
  try {
    const resource = await Model.findByIdAndDelete({ _id: id });
    if (resource !== null && resource !== undefined) {
      fs.unlinkSync(`${resource.image}`, (err) => {
        if (err) throw err;
        console.log(`Successfully deleted file ${resource.image}`);
      });
    }

    res.status(200).json("resource deleted successfully");
  } catch (error) {
    res.json({ error: error.message });
  }
};

const resource_controller = {
  getAll,
  addResource,
  deleteResource,
  updateResources,
  getById,
};
export default resource_controller;
