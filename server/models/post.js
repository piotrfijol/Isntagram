const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        description: {
            type: String,
            maxLength: 360
        },
        imgURL: {
            type: {
                "1280": {type: String},
                "480": {type: String}
            },
            required: true
        },
        tags: [String],
        likesCount: {
            type: Number,
            default: 0
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Post", postSchema)