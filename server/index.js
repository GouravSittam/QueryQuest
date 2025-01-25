import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import questionRoutes from './route/questions.js';

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// app.use('/questions', questionRoutes); // Use the question routes

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

let db;

MongoClient.connect(CONNECTION_URL)
    .then(client => {
        db = client.db(); // Use the default database
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch(error => console.error(error));

app.get('/all', async (req, res) => {
    try {
        const tests = await db.collection('Data').find({}).limit(10).toArray();
        res.status(200).json(tests);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

app.get('/word', async (req, res) => {
    try {
        const tests = await db.collection('Data').find({ anagramType: "WORD" }).limit(10).toArray();
        res.status(200).json(tests);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

app.get('/sentence', async (req, res) => {
    try {
        const tests = await db.collection('Data').find({ anagramType: "SENTENCE" }).limit(10).toArray();
        res.status(200).json(tests);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

app.get('/mcq', async (req, res) => {
    try {
        const tests = await db.collection('Data').find({ type: "MCQ" }).limit(10).toArray();
        res.status(200).json(tests);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

app.get('/read', async (req, res) => {
    try {
        const tests = await db.collection('Data').find({ type: "READ_ALONG" }).limit(10).toArray();
        res.status(200).json(tests);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

app.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ message: "Query parameter 'q' is required" });
        }

        const tests = await db.collection('Data').find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        }).limit(10).toArray();

        console.log(tests);


        res.status(200).json(tests);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


app.get('/', (req, res) => {
    res.send('Hello to Memories API');
});