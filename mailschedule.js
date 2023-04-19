import cron from "node-cron";
import nodemailer from "nodemailer";
import moment from "moment";
import Subscription from "./models/subscription_model.js";

const emailSender = process.env.EMAIL_SENDER;
const emailPass = process.env.EMAIL_PASSWORD;

// email transport configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailSender,
    pass: emailPass,
  },
});

cron.schedule("27 14 * * *", async () => {
  try {
    const dueDate = moment().add(2, "days").toDate();
    const subscriptions = await Subscription.find({ DueDate: dueDate }).populate(
      "User",
      "_id FirstName LastName Email Phone"
    );
    console.log(subscriptions);

    subscriptions.forEach(async (subscription) => {
      const msg = {
        to: subscription.User.Email,
        from: emailSender,
        subject: "Your subscription is ending soon!",
        html: `<p>Hi ${subscription.User.FirstName},</p>
           <p>Your subscription is ending in two days. Please renew your subscription to continue using our service.</p>
           <p>Thank you!</p>`,
      };

      // send email notification
      try {
        const info = await transporter.sendMail(msg);
        console.log("Email sent: " + info.response);
      } catch (error) {
        console.log(error);
      }
    });
  } catch (err) {
    console.error(err);
  }
});
