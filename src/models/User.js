const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: [true, 'Username is required!'],
        unique: true,
        minLength: [5, 'Username is too short!'],
        match: [/^[A-Za-z0-9]+$/ , 'Username must be alpanumeric!'],
      },
    password: {
        type:String,
        required:[true, 'Password is required!'],
        minLength: [8, 'Password is too short!'],
        match: /^[A-Za-z0-9]+$/,
    },
});

userSchema.virtual('repeatPassword')
    .set(function(value){
        if(value !== this.password) {
            throw new Error('Password missmatch!');
        }
    })

userSchema.pre('save', async function(){
 const hash = await bcrypt.hash(this.password, 10);

 this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;