// import express from 'express';
// import Question from '../model/question.js';

// const router = express.Router();

// // Get all questions
// router.get('/', async (req, res) => {
//     try {
//         const questions = await Question.find({});
//         res.status(200).json(questions);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// });

// // Get a specific question by ID
// router.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const question = await Question.findById(id);
//         res.status(200).json(question);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// });

// // Create a new question
// router.post('/', async (req, res) => {
//     const question = req.body;
//     const newQuestion = new Question(question);
//     try {
//         await newQuestion.save();
//         res.status(201).json(newQuestion);
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// });

// // Update a question by ID
// router.patch('/:id', async (req, res) => {
//     const { id } = req.params;
//     const updatedQuestion = req.body;
//     try {
//         const question = await Question.findByIdAndUpdate(id, updatedQuestion, { new: true });
//         res.status(200).json(question);
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// });

// // Delete a question by ID
// router.delete('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         await Question.findByIdAndRemove(id);
//         res.status(200).json({ message: 'Question deleted successfully' });
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// });

// export default router;

import express from 'express';
import Question from '../model/question.js';
import { MongoClient } from 'mongodb';

const router = express.Router();

// Get all questions or filter by anagramType
router.get('/', async (req, res) => {
    try {
        const tests = await db.collection('Data').find().toArray();
        res.status(200).json(tests);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Get a specific question by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const question = await Question.findById(id);
        res.status(200).json(question);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Create a new question
router.post('/', async (req, res) => {
    const question = req.body;
    const newQuestion = new Question(question);
    try {
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// Update a question by ID
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedQuestion = req.body;
    try {
        const question = await Question.findByIdAndUpdate(id, updatedQuestion, { new: true });
        res.status(200).json(question);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// Delete a question by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Question.findByIdAndRemove(id);
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

export default router;