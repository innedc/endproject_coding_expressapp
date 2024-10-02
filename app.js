import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routeIndex from './routes/index.js';
import routeTest from './routes/test.js';
import routeMessages from './routes/messages.js';
import routeUsers from './routes/users.js';

dotenv.config();

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Event listeners for the connection
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

// Use the imported routes
app.use('/', routeIndex);
app.use('/test', routeTest);
app.use ('/messages', routeMessages);
app.use ('/users', routeUsers);

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

