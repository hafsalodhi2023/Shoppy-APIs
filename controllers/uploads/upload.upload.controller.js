const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;

const create = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file found",
      });
    }

    // Function to handle the stream upload to Cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        // Use streamifier to convert file buffer to a stream
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    // Call the streamUpload function
    const result = await streamUpload(req.file.buffer);

    // Respond with the uploaded image URL
    return res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

module.exports = create;
