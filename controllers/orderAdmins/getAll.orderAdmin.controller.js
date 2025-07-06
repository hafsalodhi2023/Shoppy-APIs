const Order = require("../../models/order.model");

const getAll = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");

    res.status(200).json({
      data: orders,
      message: "Orders retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving orders",
    });
  }
};

module.exports = getAll;
