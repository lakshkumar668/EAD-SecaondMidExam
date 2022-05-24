const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

async function main(){
    await mongoose.connect('mongodb://localhost:27017/practice');
}
main().catch(err => console.log("database not connected"));

const userSchema = new mongoose.Schema({
    path: String,
    fullname: String,
    email: String,
    phone:Number,
    country: String,
    state: String,
    city:String,
    address:String,
    zip:Number
    
   
});
const Users = mongoose.model('user', userSchema);
module.exports = Users;