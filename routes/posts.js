const express = require('express');
const Post = require('../models/Post');
const auth = require('../middlewares/authMiddleware');
const uploads = require('../multer').uploads;

const router = express.Router();

router.get('/',[auth], async (req, res) => {
    const posts = await Post.find({user: {$in : [...req.user.subscriptions,req.user._id]}});
    res.send(posts);
});

router.post('/', [auth, uploads.single('image')], async (req, res) => {
    try {
        const postData = {
            text: req.body.text,
            image: req.body.image,
            user: req.user._id,
            tags: JSON.parse(req.body.tags)
        };

        if (req.file) {
            postData.image = req.file.filename;
        }

        const post = new Post(postData);

        await post.save();

        return res.send({id: post._id});
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;
