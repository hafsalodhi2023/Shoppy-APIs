// @collapse
const debug = require("debug")(
  "server:controllers:carts:update.cart.controller.js"
);

const Product = require("../../models/product.model"); // Import Product model
const Cart = require("../../models/cart.model"); // Import Cart model

const getCart = require("../../utils/getCart.util"); // Import getCart utility

const update = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    debug("Request PUT /api/cart/update");
    let cart = await getCart(guestId, userId);
    if (!cart) {
      debug("Request PUT /api/cart/update: Cart not found");
      return res.status(404).json({
        success: false,
        error: true,
        data: null,
        message: "Cart not found",
      });
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = Number(quantity);
      } else {
        cart.products.splice(productIndex, 1);
      }
      // Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (accumulator, item) => accumulator + item.price * item.quantity,
        0
      );
      await cart.save();
      debug("Request PUT /api/cart/update: Cart updated successfully");
      return res.status(200).json({
        success: true,
        error: false,
        data: cart,
        message: "Cart updated successfully",
      });
    } else {
      debug("Request PUT /api/cart/update: Product not found in cart");
      return res.status(404).json({
        success: false,
        error: true,
        data: null,
        message: "Product not found in cart",
      });
    }
  } catch (error) {
    debug("Request PUT /api/cart/update: Error updating cart", error);
    return res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Error updating cart",
    });
  }
};

module.exports = update;
