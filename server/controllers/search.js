const tagModel = require("../models/tags");
const userModel = require("../models/user");

const search = async (req, res) => {
    const phrase = decodeURI(req.query.q);

    if(!phrase) {
        return res.status(404).json({statusCode: 404});    
    }

    if(phrase.startsWith("#")) {
        let re = new RegExp(`^${phrase.slice(1)}[A-Za-z0-9]*`);
        const tagList = await tagModel.find({name: re}, "-_id -__v").limit(5);
        return res.status(200).json({
            statusCode: 200,
            tags: tagList,
            type: 'tags'
        })
    } else {
        let re = new RegExp(`^${phrase}[A-Za-z0-9\._]*`);
        const userList = await userModel.find({username: re}, "username").limit(5);
        return res.status(200).json({
            statusCode: 200,
            users: userList,
            type: 'users'
        })
    }

};

module.exports = {
    search
}