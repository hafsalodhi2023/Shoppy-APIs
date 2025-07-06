const debug = require("debug")(
  "server:controllers:orderAdmins:update.orderAdmin.controller.js"
);

const Order = require("../../models/order.model");

const updateOrder = async (req, res) => {
  try {
    debug("Request PUT /api/admin/orders/update/:id");
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      debug("Request PUT /api/admin/orders/update/:id - Order not found");
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;
    order.isDelivered = status === "Delivered" ? true : order.isDelivered;
    order.deliveredAt = status === "Delivered" ? new Date() : order.deliveredAt;

    const updatedOrder = await order.save();

    debug(
      "Request PUT /api/admin/orders/update/:id - Order updated successfully"
    );
    return res.status(200).json({
      data: updatedOrder,
      message: "Order updated successfully",
    });
  } catch (error) {
    debug(
      "Request PUT /api/admin/orders/update/:id - Error updating order: %O",
      error
    );
    return res.status(500).json({
      message: "Error updating order",
    });
  }
};

module.exports = updateOrder;
