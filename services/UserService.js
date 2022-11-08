const UserModel = require("../models/UserModel");
const { cryptPassword, comparePassword } = require('../utils/bcrypt');
const jwt = require("../utils/jwt");
module.exports = {
    login: async function login(email, password){
        const user = await UserModel.findOne({email});

        if(user){
            if(! await comparePassword(password, user.password) ) return null;
            user.password = undefined;
        }
        let tokenData = {
            time: Date(),
            user,
        }
        
        const token = jwt.generate(tokenData);
        return {user, token};
    },

    register: async function createUser({name,email,password}){
        const encrypedPass = cryptPassword(password) ;
        const user = new UserModel({name, email, password: encrypedPass});
        await user.save();
        return user;
    },

    findOne: async function findOne(payload){
        const user = await UserModel.findOne(payload);
        user.password = undefined;
        return user;
    }
}