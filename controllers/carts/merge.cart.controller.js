const debug = require("debug")(
  "server:controllers:carts:merge.cart.controller.js"
);

const Cart = require("../../models/cart.model"); // Import Cart model

const merge = async (req, res) => {
  const { guestId } = req.body; // Get the guestId from the request body
  try {
    debug("Request POST /api/cart/merge");

    // Find the guest's cart and the logged in user's cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        debug("Request POST /api/cart/merge: Guest cart is empty");
        return res.status(400).json({
          success: false,
          error: true,
          data: null,
          message: "Guest cart is empty",
        });
      }
      if (userCart) {
        // Merge the guest cart products into the user's cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex((item) => {
            item.products.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color;
          });
          if (productIndex > -1) {
            // If the items exists in the user cart, update the quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // Otherwise, add the guest item to the user's cart
            userCart.products.push(guestItem);
          }
        });
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await userCart.save(); // Save the updated user cart

        // Delete the guest cart
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          debug(
            "Request POST /api/cart/merge: Error deleting guest cart",
            error
          );
          return res.status(500).json({
            success: false,
            error: true,
            data: null,
            message: "Failed to delete guest cart",
          });
        }
      } else {
        // if the user has no existing cart, assign the guest cart to the user
        guestCart.user = req.user._id; // Assign the user ID to the guest cart
        guestCart.guestId = undefined; // Remove the guestId as it's now a user cart
        await guestCart.save(); // Save the updated guest cart as a user cart
        debug("Request POST /api/cart/merge: Guest cart merged into user cart");
        return res.status(200).json({
          success: true,
          error: false,
          data: guestCart,
          message: "Guest cart merged into user cart",
        });
      }
    } else {
      if (userCart) {
        // Guest cart has already been merged, return user's cart
        debug("Request POST /api/cart/merge: No guest cart found");
        return res.status(200).json({
          success: true,
          error: false,
          data: userCart,
          message: "Returning user cart",
        });
      }
      debug("Request POST /api/cart/merge: No guest cart found");
      return res.status(400).json({
        success: false,
        error: true,
        data: null,
        message: "No guest cart found",
      });
    }
  } catch (error) {
    debug("Request POST /api/cart/merge: Error", error);
    return res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Failed to merge carts",
    });
  }
};

module.exports = merge;
