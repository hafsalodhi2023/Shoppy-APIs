const debug = require("debug")(
  "server:controllers:orders:detail.order.controller.js"
);

const Order = require("../../models/order.model"); // Import Order model

const detail = async (req, res) => {
  try {
    debug("Request GET /api/orders/:id");
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      debug("Request GET /api/orders/:id: Order not found");
      return res.status(404).json({
        data: null,
        message: "Order not found",
      });
    }

    debug("Request GET /api/orders/:id: Order fetched successfully");
    return res.status(200).json({
      data: order,
      message: "Order fetched successfully",
    });
  } catch (error) {
    debug("Request GET /api/orders/:id: Failed to fetch order details", error);
    return res.status(500).json({
      data: null,
      message: "Internal Server Error.",
    });
  }
};

module.exports = detail;
