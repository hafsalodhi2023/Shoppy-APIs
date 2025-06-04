// @collapse
const debug = require("debug")(
  "server:controllers:checkouts:create.checkout.controller.js"
);

const Checkout = require("../../models/checkout.model"); // Import Checkout model

const create = async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  debug("Request POST /api/checkout/create");

  if (!checkoutItems || checkoutItems.length === 0) {
    debug("Request POST /api/checkout/create: No checkout items provided");
    return res.status(400).json({
      success: false,
      error: true,
      data: null,
      message: "No checkout items provided",
    });
  }

  try {
    // Create a new checkout session
    const newCheckout = await Checkout.create({
      user: req.user._id, // Assuming req.user is populated by auth middleware
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending", // Default status
      isPaid: false, // Default status
    });

    debug(
      "Request POST /api/checkout/create: Checkout session created successfully!"
    );
    return res.status(201).json({
      success: true,
      error: false,
      data: newCheckout,
      message: "Checkout session created successfully",
    });
  } catch (error) {
    debug("Request POST /api/checkout/create: ", error);
    return res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Internal server error.",
    });
  }
};

module.exports = create;
