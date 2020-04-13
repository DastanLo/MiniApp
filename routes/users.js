const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt");
const auth = require('../middlewares/authMiddleware');
const upload = require('../multer').avatar;

const User = require('../models/User');
const uploadPath = require('../multer').uploadPath;

const router = express.Router();

router.post('/', async (req, res) => {

    if (!req.body.password || !req.body.username || !req.body.display_name) {
        return res.status(400).send({error: "All fields must be filled"});
    }
    const user = new User(req.body);
    try {
        user.generateToken();
        await user.save();
        return res.status(201).send(user);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.patch('/profile', [auth, upload.single('avatar')], async (req, res) => {
    try {
        if (req.file) {
            if (req.user.avatar) {
                await fs.promises.unlink(path.join(uploadPath, req.user.avatar));
            }
            req.user.avatar = req.file.filename;
        }
        if (req.body.display_name) {
            req.user.display_name = req.body.display_name;
        }
        await req.user.save();

        return res.send(req.user);
    } catch (e) {
        return res.sendStatus(500);
    }
});


router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: 'Username or password not correct!'});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Username or password not correct!'});
    }

    user.generateToken();

    await user.save();

    return res.send(user);
});


router.delete('/sessions', async (req, res) => {
    const success = {message: 'Success'};

    try {
        const token = req.get('Authorization').split(' ')[1];

        if (!token) return res.send(success);

        const user = await User.findOne({token});

        if (!user) return res.send(success);

        user.generateToken();
        await user.save();

        return res.send(success);
    } catch (e) {
        return res.send(success);
    }
});

router.post('/subscribe', [auth], async (req, res) => {
    if (!req.body.username) {
        return res.status(400).send({message: 'Field "username" must be filled'});
    }
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).send({message: 'Such user with this username doesnt exist'});
    }
    try {
        await User.updateOne({_id: req.user._id}, {
            $push: {
                subscriptions: user._id,
            }
        }, {runValidators: true});
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
