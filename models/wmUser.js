
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const wmUserSchema = new Schema({
    userID: {type: String, unique: true, required: true},
    userName: {type: String, unique: true, required: true},
    userEmail: {type: String, unique: true, required: true},
    occupation: {type: String, required: true},
    aboutMe: {type: String, required: true},
    hobbies: {type: String, required: true},
    food: {type: String, required: true},
    music: {type: String, required: true},
    inRoom: {type: String},
    img: {data: Buffer, contentType: String}
});


const WmUser = mongoose.model("WmUser", wmUserSchema);

module.exports = WmUser;