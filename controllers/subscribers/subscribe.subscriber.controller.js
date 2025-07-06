
const Subscriber = require("../../models/subscriber.model");

const subscribe = async (req, res) => {
  const { email } = req.body;


  if (!email) {
    return res.status(400).json({
      message: "Email is required.",
    });
  }

  try {
    // Check if email is already subscribed
    const subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return res.status(400).json({
        message: "Email is already subscribed.",
      });
    }

    // Create a new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    return res.status(200).json({
      message: "Subscribed successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

module.exports = subscribe;
