// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
  cloud_name: 'dpoxnquml', 
  api_key: '761142961192217', 
  api_secret: '50ZQISUmOhWvfGRqrO-Ob2OFZFs' 
});

module.exports = cloudinary;
