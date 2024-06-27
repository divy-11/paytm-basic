const mongoose = require("mongoose");
const { string, number } = require("zod");
mongoose.connect('mongodb+srv://Admin:jZEOL6CqWnapaRou@cluster0.g8cch4b.mongodb.net/Paytm');

const userList = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String,
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const Users = mongoose.model('users', userList);
const Account = mongoose.model('accounts', accountSchema)
module.exports = { Users, Account }