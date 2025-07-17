const getCart = require("../../utils/getCart.util"); // Import getCart utility

const deleete = async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(guestId, userId);
    if (!cart) {
      return res.status(404).json({
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
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = deleete;
