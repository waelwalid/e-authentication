
const { json } = require('express');
const jwt = require('../utils/jwt')
const authenticate = (req, res, next) => {
    try {
        const verify = jwt.verify(req.get('Authorization'));
        if (!verify) return res.json({ message: 'unauthorized' }).status(401);
        req.body.user = verify.user;
        next();
    } catch (e) {
        return res.json(e);
    }
}

module.exports = {
    authenticate
}
