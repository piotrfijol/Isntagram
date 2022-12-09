const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    profile: {
        biography: {
            type: String,
            maxlength: 480,
            default: ''
        },
        img: {
            "128": String,
            "256": String
        }
    },
    refreshToken: {
        type: String,
    }
});

module.exports = mongoose.model('User', UserSchema);

