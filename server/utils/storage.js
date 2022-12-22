const cloudinary = require("cloudinary").v2;
const path = require("path");
const DataURIParser = require("datauri/parser");
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});



const uploadImage = (file, config = {}) => {

    const defaultConfig = {
        width: 0,
        aspectRatio: "4:3",
        folder: "posts"
    }

    const width = config.width ? config.width : defaultConfig.width,
        aspectRatio = config.aspectRatio ? config.aspectRatio : defaultConfig.aspectRatio,
        folder = config.folder ? config.folder : defaultConfig.folder;

    if(!Number.isInteger(config['width'])) throw new TypeError("Width must be an integer number");

    const fileParser = new DataURIParser();
    const extName = path.extname(file.originalname).toString();
    const fileContent = fileParser.format(extName, file.buffer);

    return cloudinary.uploader.upload(fileContent.content, {
        transformation: [
            {crop: "scale", width},
            {crop: "fill", width, aspect_ratio: aspectRatio, gravity: "auto"}
        ],
        folder: [folder, width.toString()].join('/')
    })

};

module.exports = {
    cloudinary,
    uploadImage
};