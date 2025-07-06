const Checkout = require("../../models/checkout.model"); // Import Checkout model
const Order = require("../../models/order.model"); // Import Order model
const Cart = require("../../models/cart.model"); // Import Order model

const finalize = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({
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
      return res.status(201).json({
        data: finalOrder,
        message: "Checkout finalized successfully",
      });
    } else if (checkout.isFinalized) {
      return res.status(400).json({
        message: "Checkout already finalized",
      });
    } else {
      return res.status(400).json({
        message: "Checkout not paid",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error finalizing checkout",
    });
  }
};

module.exports = finalize;
