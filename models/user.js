import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true }, 
    email: { type: String, required: true }, 
    createAt: { type: Date, default: Date.now },
});

//create a message model
const User = mongoose.model('User', userSchema);

export default User;