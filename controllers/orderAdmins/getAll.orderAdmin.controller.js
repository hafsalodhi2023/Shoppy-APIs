 = require("debug")(
  "server:controllers:orderAdmins:getAll.orderAdmin.controller.js"
);

const Order = require("../../models/order.model");

const getAll = async (req, res) => {
  try {
    debug("Request GET /api/admin/orders/get-all");
    const orders = await Order.find({}).populate("user", "name email");
    debug(
      "Request GET /api/admin/orders/get-all - Orders retrieved successfully"
    );
    res.status(200).json({
      success: true,
      error: false,
      data: orders,
      message: "Orders retrieved successfully",
    });
  } catch (error) {
    debug(
      "Request GET /api/admin/orders/get-all - Error retrieving orders: %O",
      error
    );
    res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Error retrieving orders",
    });
  }
};

module.exports = getAll;
