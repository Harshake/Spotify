const cloudinary = require("cloudinary")
  .v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_api,
  api_secret: process.env.cloud_secret,
});

module.exports = cloudinary;