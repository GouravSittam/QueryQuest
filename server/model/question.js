import mongoose from 'mongoose';

const blockSchema = mongoose.Schema({
    text: { type: String, required: true },
    showInOption: { type: Boolean, required: true },
    isAnswer: { type: Boolean, required: true },
});

const questionSchema = mongoose.Schema({
    type: { type: String, required: true },
    siblingId: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    anagramType: { type: String }, // Optional field
    solution: { type: String }, // Optional field
    options: { type: [String] }, // Array of strings for MCQ options
    blocks: { type: [blockSchema] }, // Array of block objects
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const question = mongoose.model('Question', questionSchema);

export default question;