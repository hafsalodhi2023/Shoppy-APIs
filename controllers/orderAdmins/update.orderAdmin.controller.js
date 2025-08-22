const Order = require("../../models/order.model");

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id).populate("user","name");

    if (order) {
      order.status = status;
      order.isDelivered = status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt =
        status === "Delivered" ? new Date() : order.deliveredAt;

      const updatedOrder = await order.save();
      return res.status(200).json(updatedOrder);
    } else {
      return res.status(404).json({
        message: "Order not found",
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Error updating order",
    });
  }
};

module.exports = updateOrder;
