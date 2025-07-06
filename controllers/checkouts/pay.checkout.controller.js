const debug = require("debug")(
  "server:controllers:checkouts:update.checkout.controller.js"
);

const Checkout = require("../../models/checkout.model"); // Import Checkout model

const pay = async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    debug("Request PUT /api/checkout/:id");
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      debug("Request PUT /api/checkout/:id: Checkout not found");
      return res.status(404).json({
        message: "Checkout not found",
      });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();

      debug("Request PUT /api/checkout/:id: Checkout updated successfully!");
      return res.status(200).json({
        data: checkout,
        message: "Checkout updated successfully",
      });
    } else {
      debug("Request PUT /api/checkout/:id: Invalid payment status");
      return res.status(400).json({
        message: "Invalid payment status",
      });
    }
  } catch (error) {
    debug("Request PUT /api/checkout/:id: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = pay;
