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
 


import path from 'path';

export const updateResources = async (req, res, next) => {
  const { name, type, price, count, description, media } = req.body;
  try {
    let resource = await resourceModel.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    if (resource.media && resource.media !== media) {
      const mediaPath = path.join('public', 'images', resource.media);
      fs.unlinkSync(mediaPath);
    }

    resource.name = name;
    resource.type = type;
    resource.description = description;
    resource.price = price;
    resource.count = count;
    resource.admin_id = admin_id;
    resource.subject_id = subject_id;
    
    // Check if the media field is provided in the request body
    if (media) {
      resource.media = `images/${media}`;
    }

    await resource.save();
    res.json(resource);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, err: err.message });
  }
};



export const deleteResource = async (req, res) => {
  let { id } = req.params;
  try {
    const resource = await resourceModel.findByIdAndDelete({ _id: id });
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    if (resource.image) {
      fs.unlink(resource.image, (err) => {
        if (err) {
          console.error(`Error deleting image file: ${err}`);
        } else {
          console.log(`Successfully deleted image file: ${resource.image}`);
        }
      });
    }

    if (resource.file) {
      fs.unlink(resource.file, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
        } else {
          console.log(`Successfully deleted file: ${resource.file}`);
        }
      });
    }

    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
