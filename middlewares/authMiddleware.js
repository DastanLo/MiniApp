const User = require('../models/User');

module.exports = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        return res.status(401).send({error: 'No authorization header'});
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Token' || !token) {
        return res.status(401).send({error: 'Authorization type wrong or token not present'});
    }
    const user = await User.findOne({token});

    if (!user) {
        res.status(401).send({error: 'No user found with this token'});
    }
    req.user = user;
    next();
};
