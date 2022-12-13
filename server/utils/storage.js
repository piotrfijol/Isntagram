const cloudinary = require("cloudinary").v2;
const path = require("path");
const DataURIParser = require("datauri/parser");
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});


const defaultConfig = {
    width: 0,
    aspectRatio: "4:3",
    folder: "posts"
}

const uploadImage = (file, config = defaultConfig) => {

    if(!Number.isInteger(config['width'])) throw new TypeError("Width must be an integer number");

    const fileParser = new DataURIParser();
    const extName = path.extname(file.originalname).toString();
    const fileContent = fileParser.format(extName, file.buffer);

    return cloudinary.uploader.upload(fileContent.content, {
        transformation: [
            {crop: "scale", width: config['width']},
            {crop: "fill", width: config['width'], aspect_ratio: config['aspectRatio'], gravity: "auto"}
        ],
        folder: [config['folder'], config['width'].toString()].join('/')
    })

};

module.exports = {
    cloudinary,
    uploadImage
};