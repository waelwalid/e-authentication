const UserService = require('../services/UserService');
module.exports = {

    auth: async function(req, res, next){
        try{
            const user = await UserService.findOne(req.body.user);
            return res.json(user);
        }catch(e){
            return res.json(e);
        }
    },

    login: async function(req, res, next){
        try{
            const user = await UserService.login(req.body.email, req.body.password);
            return res.json(user) ;
        }catch(e){
            return res.json(e);
        }
    },

    register: async function(req, res, next){
        try{
            const { name, email, password } = req.body;
            const user = await UserService.register({name, email, password});
            res.json({user}) ;
        }catch(e){
            /** duplicated key [MONGO] */
            let errors = e ;
            if(e.code == 11000 && e.keyValue.hasOwnProperty("email")) {
                errors = {
                    key: 'email',
                    message: "This key is already exist"
                }
            }; 
            return res.json({errors});
        }
    },
}
