import SubscriptionModel from "../models/subscription_model.js";
import mongoose from "mongoose";

class Subscription {
  async getAllSubscriptions(req, res, next) {
    try {
      const { page, limit } = req.query;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 20,
        populate: "User",
      };
      const response = await SubscriptionModel.paginate({}, options);
      return res.status(200).send({ success: true, response });
    } catch (err) {
      next(err);
    }
  }

  async getSubscription(req, res, next) {
    try {
      let { id } = req.params;
      var validId = mongoose.Types.ObjectId.isValid(id);
      console.log(validId);
      if (!validId) {
        return res.status(400).send({ status: 400, message: "invalid id" });
      }
      const response = await SubscriptionModel.findOne({ _id: id });
      return res.status(200).send({ success: true, response });
    } catch (err) {
      next(err);
    }
  }

  async editSubscription(req, res, next) {
    try {
      let filter = req.params.id;
      let update = req.body;
      const response = await SubscriptionModel.findOneAndUpdate(
        filter,
        update,
        {
          new: true,
        }
      );
      return res.status(200).send({ success: true, response });
    } catch (err) {
      next(err);
    }
  }

  async deleteSubscription(req, res, next) {
    try {
      let { id } = req.params;
      const response = await SubscriptionModel.findByIdAndDelete({ _id: id });
      return res.status(200).send({ success: true, response });
    } catch (err) {
      next(err);
    }
  }

  async addSubscription(req, res, next) {
    try {
      const { Payment, DueDate, User, Description, StartDate } = req.body;
      if (!(Payment && User && Description)) {
        res.status(400).send("Payment, User, and Description are required");
      }
      let body = req.body;
      let doc = new SubscriptionModel({ ...body });
      const savedSubscription = await doc.save();
      res.status(200).send({ success: true, response: savedSubscription });
    } catch (error) {
      if (error) return next(error);
      return res.status(400).send(`Error: ${error}`);
    }
  }
}

const SubscriptionController = new Subscription();
export default SubscriptionController;
