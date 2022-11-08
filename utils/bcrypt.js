const bcrypt = require('bcrypt');

exports.cryptPassword = (string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(string, salt)
    return hash; 
}
    


exports.comparePassword = async function(plainPass, hashword, callback) {
   return bcrypt.compareSync(plainPass, hashword);
};