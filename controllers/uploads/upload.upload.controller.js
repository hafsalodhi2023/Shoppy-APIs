const debug = require("debug")(
  "server:controllers:uploads:upload.upload.controller.js"
);

const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;

const create = async (req, res) => {
  try {
    debug("Request POST /api/uploads/upload");
    if (!req.file) {
      debug("Request POST /api/uploads/upload: No file found");
      return res.status(400).json({
        data: null,
        message: "No file found",
      });
    }

    // Function to handle the stream upload to Cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            debug(
              "Request POST /api/uploads/upload: File uploaded to Cloudinary"
            );
            resolve(result);
          } else {
            debug(
              "Request POST /api/uploads/upload: File upload to Cloudinary failed"
            );
            reject(error);
          }
        });
        // Use streamifier to convert file buffer to a stream
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    // Call the streamUpload function
    const result = await streamUpload(req.file.buffer);

    debug("Request POST /api/uploads/upload: File uploaded to Cloudinary");
    // Respond with the uploaded image URL
    return res.status(200).json({
      data: result.secure_url,
      message: "File uploaded successfully.",
    });
  } catch (error) {
    debug(
      "Request POST /api/uploads/upload: File upload to Cloudinary failed",
      error
    );
    return res.status(500).json({
      data: null,
      message: "Internal server error.",
    });
  }
};

module.exports = create;
