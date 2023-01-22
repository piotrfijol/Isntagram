const postModel = require("../models/post");

const getPostsByTag = async (req, res) => {
    const {tag} = req.params;
    const PAGE_SIZE = 3;
    const page = req.query['p'];

    const posts = await postModel.find({tags: tag}).populate("user", "-_id").sort({createdAt: -1}).skip(PAGE_SIZE * page).limit(PAGE_SIZE);

    return res.status(200).json({
        status: 200,
        posts
    });
};

module.exports = {
    getPostsByTag
}