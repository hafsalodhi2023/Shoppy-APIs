const update = (req, res) => {
  res.status(200).json({
    message: "Product updated successfully",
    productId: req.params.id,
    productData: req.body,
  });
};

module.exports = update;
