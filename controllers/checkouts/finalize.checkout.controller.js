const debug = require("debug")(
  "server:controllers:checkouts:finalize.checkout.controller.js"
);

const Checkout = require("../../models/checkout.model"); // Import Checkout model
const Order = require("../../models/order.model"); // Import Order model
const Cart = require("../../models/cart.model"); // Import Order model

const finalize = async (req, res) => {
  try {
    debug("Request POST /api/checkout/:id");
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      debug("Request POST /api/checkout/:id: Checkout not found");
      return res.status(404).json({
        success: false,
        error: true,
        data: null,
        message: "Checkout not found",
      });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      // Create final order based on the checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingDetails: checkout.shippingDetails,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      // mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();

      await checkout.save();

      // Delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user });
      debug("Request POST /api/checkout/:id: Checkout finalized successfully");
      return res.status(201).json({
        success: true,
        error: false,
        data: finalOrder,
        message: "Checkout finalized successfully",
      });
    } else if (checkout.isFinalized) {
      debug("Request POST /api/checkout/:id: Checkout already finalized");
      return res.status(400).json({
        success: false,
        error: true,
        data: null,
        message: "Checkout already finalized",
      });
    } else {
      debug("Request POST /api/checkout/:id: Checkout not paid");
      return res.status(400).json({
        success: false,
        error: true,
        data: null,
        message: "Checkout not paid",
      });
    }
  } catch (error) {
    debug("Request POST /api/checkout/:id: Error finalizing checkout", error);
    return res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Error finalizing checkout",
    });
  }
};

module.exports = finalize;
