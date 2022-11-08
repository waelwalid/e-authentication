const JWT = require('jsonwebtoken');
module.exports = {
    generate(data){
        return JWT.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '2d' , issuer: process.env.JWT_SERVICE_ISS });
    },
    verify(token){
        return JWT.verify(token, process.env.JWT_SECRET_KEY);
    }
} 