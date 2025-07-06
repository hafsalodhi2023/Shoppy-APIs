const Order = require("../../models/order.model");

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;
    order.isDelivered = status === "Delivered" ? true : order.isDelivered;
    order.deliveredAt = status === "Delivered" ? new Date() : order.deliveredAt;

    const updatedOrder = await order.save();

    return res.status(200).json({
      data: updatedOrder,
      message: "Order updated successfully",
    });
  } catch (error) {

    return res.status(500).json({
      message: "Error updating order",
    });
  }
};

module.exports = updateOrder;
