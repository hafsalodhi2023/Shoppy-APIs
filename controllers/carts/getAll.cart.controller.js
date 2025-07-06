
const getCart = require("../../utils/getCart.util"); // Import getCart utility

const getAll = async (req, res) => {
  const { userId, guestId } = req.query;
  try {
    const cart = await getCart(guestId, userId); // Call getCart utility
    if (cart) {
      return res.status(200).json({
        data: cart,
        message: "Cart retrieved successfully",
      });
    } else {
      return res.status(404).json({
        message: "Cart not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getAll;
