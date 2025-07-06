 = require("debug")(
  "server:controllers:orderAdmins:delete.orderAdmin.controller.js"
);

const Order = require("../../models/order.model");

const deleteOrder = async (req, res) => {
  try {
    debug("Request DELETE /api/admin/orders/delete/:id");
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: true,
        data: null,
        message: "Order not found",
      });
    }

    await Order.findByIdAndDelete(id);

    debug(
      "Request DELETE /api/admin/orders/delete/:id - Order deleted successfully"
    );
    return res.status(200).json({
      success: true,
      error: false,
      data: null,
      message: "Order deleted successfully",
    });
  } catch (error) {
    debug(
      "Request DELETE /api/admin/orders/delete/:id - Error deleting order: %O",
      error
    );
    return res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Error deleting order",
    });
  }
};

module.exports = deleteOrder;
