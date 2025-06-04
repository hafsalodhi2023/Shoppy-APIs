// @collapse
const debug = require("debug")(
  "server:controllers:carts:create.cart.controller.js"
);

const Product = require("../../models/product.model"); // Import Product model
const Cart = require("../../models/cart.model"); // Import Cart model

// Import getCart utility
const getCart = require("../../utils/getCart.util"); // Import getCart utility

const create = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    debug("Request POST /api/cart/create");

    const product = await Product.findById(productId);

    if (!product) {
      debug("Request POST /api/cart/create: Product not found");
      return res.status(404).json({
        success: false,
        error: true,
        data: null,
        message: "Product not found",
      });
    }

    // Determine if the user is a guest or logged in
    let cart = await getCart(guestId, userId);

    // If the cart exists, update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );
      if (productIndex > -1) {
        // if the product already exists in the cart, update the quantity
        cart.products[productIndex].quantity += Number(quantity);
      } else {
        // add new product to the cart
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }
      // Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (accumulator, item) => accumulator + item.price * item.quantity,
        0
      );
      await cart.save();
      debug("Request POST /api/cart/create: Cart updated successfully");
      res.status(200).json({
        success: true,
        error: false,
        data: cart,
        message: "Cart updated successfully",
      });
    } else {
      // Creates a new cart for guest or logged in user
      cart = new Cart({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      await cart.save();
      debug("Request POST /api/cart/create: Cart created successfully");
      return res.status(201).json({
        success: true,
        error: false,
        data: cart,
        message: "Cart created successfully",
      });
    }
  } catch (error) {
    debug("Request POST /api/cart/create: ", error);
    res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Internal server error",
    });
  }
};

module.exports = create;
