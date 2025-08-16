const Checkout = require("../../models/checkout.model"); // Import Checkout model

const create = async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({
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

    return res.status(201).json(newCheckout);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

module.exports = create;
