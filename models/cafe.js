import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    rating: { type: String, required: true }, 
    location: { type: String, required: true }, 
    hours: { type: String, required: true }, 
    createAt: { type: Date, default: Date.now },
});

//create a message model
const User = mongoose.model('User', userSchema);

export default User;