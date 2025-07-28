const Order = require("../../models/order.model");

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (order) {
      await Order.findByIdAndDelete(id);

      return res.status(200).json({
        message: "Order deleted successfully",
      });
    } else {
      return res.status(404).json({
        message: "Order not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting order",
    });
  }
};

module.exports = deleteOrder;
