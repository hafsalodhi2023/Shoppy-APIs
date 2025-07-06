

const Order = require("../../models/order.model"); // Import Order model

const myOrder = async (req, res) => {
  try {

    // Find orders for the authenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); // Sort orders by creation date in descending order
    return res.status(201).json({
      data: orders,
      message: "Orders fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

module.exports = myOrder;
