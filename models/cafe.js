import mongoose from 'mongoose';

const cafeSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    rating: { type: Number, required: true }, 
    price: { type: String, required: true }, 
    location: { type: String, required: true }, 
    hours: { type: String, required: true }, 
    createAt: { type: Date, default: Date.now },
});

//create a message model
const Cafe = mongoose.model('Cafe', cafeSchema);

export default Cafe;