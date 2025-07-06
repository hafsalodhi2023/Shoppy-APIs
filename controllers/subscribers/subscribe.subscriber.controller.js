const debug = require("debug")(
  "server:controllers:subscribers:subscribe.subscriber.controller.js"
);

const Subscriber = require("../../models/subscriber.model");

const subscribe = async (req, res) => {
  const { email } = req.body;

  debug("Request POST /api/subscribers/subscribe");

  if (!email) {
    debug("Request POST /api/subscribers/subscribe - Email is required.");
    return res.status(400).json({
      message: "Email is required.",
    });
  }

  try {
    // Check if email is already subscribed
    const subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      debug(
        "Request POST /api/subscribers/subscribe - Email is already subscribed."
      );
      return res.status(400).json({
        message: "Email is already subscribed.",
      });
    }

    // Create a new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    debug("Request POST /api/subscribers/subscribe - Subscribed successfully.");
    return res.status(200).json({
      message: "Subscribed successfully.",
    });
  } catch (error) {
    debug("Request POST /api/subscribers/subscribe - Error: " + error.message);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

module.exports = subscribe;
