const userModel = require("../models/user");
const { uploadImage } = require("../utils/storage");
const createError = require("http-errors");

const edit = async (req, res) => {
    
    try {
        let user = await userModel.findOne({_id: req.user._id});
        
        user.profile.biography = req.body['biography']
        await user.save();
        
    } catch(err) {
        console.error(err);
    }

    res.status(201).json({
        status: 201,
        biography: req.body['biography']
    });
};

const setAvatar = async (req, res, next) => {

    let storageResponses;
    const user = await userModel.findOne(req.user._id);

    try {
        const storageRequests = [uploadImage(req.file, {width: 128, aspectRatio: "1:1", folder: 'avatars'}), uploadImage(req.file, {width: 256, aspectRatio: "1:1", folder: 'avatars'})];
        storageResponses = await Promise.all(storageRequests);
    } catch(err) {
        return next(createError(500));;
    }

    if(user) {
        user.profile.img = {
            "128": storageResponses[0].url,
            "256": storageResponses[1].url
        }
    }
        

    try {
        await user.save()
        return res.status(201).json({
            status: 201,
            img: user.profile.img
        });
    } catch(err) {
        return next(createError(500));
    }
};

module.exports = {
    edit,
    setAvatar
};