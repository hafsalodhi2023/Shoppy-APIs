const debug = require("debug")(
  "server:controllers:carts:delete.cart.controller.js"
);

const getCart = require("../../utils/getCart.util"); // Import getCart utility

const deleete = async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  debug("Request DELETE /api/cart/delete");
  try {
    let cart = await getCart(guestId, userId);
    if (!cart) {
      debug("Request DELETE /api/cart/delete: Cart not found");
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
      cart.products.splice(productIndex, 1);
      // Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (accumulator, item) => accumulator + item.price * item.quantity,
        0
      );
      await cart.save();
      debug("Request DELETE /api/cart/delete: Cart updated successfully");
      return res.status(200).json({
        success: true,
        error: false,
        data: cart,
        message: "Cart updated successfully",
      });
    } else {
      debug("Request DELETE /api/cart/delete: Product not found in cart");
      return res.status(404).json({
        success: false,
        error: true,
        data: null,
        message: "Product not found in cart",
      });
    }
  } catch (error) {
    debug("Request DELETE /api/cart/delete: Error", error);
    return res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Internal server error",
    });
  }
};

module.exports = deleete;
