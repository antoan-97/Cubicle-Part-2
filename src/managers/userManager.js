const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = (userData) => User.create(userData);

exports.login = async (username,password) => {

    const user = await User.findOne({ username });

    if(!user){
        throw new Error('Inalid username or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw new Error('Inalid username or password');
    }

    return user;
}
