const Order = require("../../models/order.model"); // Import Order model

const detail = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

module.exports = detail;
