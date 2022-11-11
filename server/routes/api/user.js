const express = require("express");
const { verifyJWT } = require("../../middleware/verifyJWT");
const router = express.Router();
const userController = require("../../controllers/user");

router.use(verifyJWT);

router.get('/user/:username',
    userController.getUser
)

router.get('/user/:username/followed',
    followController.getFollowing
);

router.get('/user/:username/followers',
    followController.getFollowers
);

router.get('/user/:username/follow',
    followController.getIsFollowing
);

router.put('/user/:username/follow',
    followController.setFollow
);

router.delete('/user/:username/follow',
    followController.removeFollow
);

module.exports = router;