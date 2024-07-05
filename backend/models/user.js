const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    name: {type:String, unique:true},
    mobile: {type:String, unique:true},
    password: String,
})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel