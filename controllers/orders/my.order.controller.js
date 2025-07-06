const debug = require("debug")(
  "server:controllers:orders:my.order.controller.js"
);

const Order = require("../../models/order.model"); // Import Order model

const myOrder = async (req, res) => {
  try {
    debug("Request GET /api/orders/my-orders");

    // Find orders for the authenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); // Sort orders by creation date in descending order
    debug("Request GET /api/orders/my-orders: Orders fetched successfully!");
    return res.status(201).json({
      error: false,
      data: orders,
      message: "Orders fetched successfully",
    });
  } catch (error) {
    debug("Request GET /api/orders/my-orders: Failed to fetch orders", error);
    return res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Internal Server Error.",
    });
  }
};

module.exports = myOrder;
