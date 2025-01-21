import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
    type: { type: String},
});

const Test = mongoose.model('Test', testSchema);

export default Test;