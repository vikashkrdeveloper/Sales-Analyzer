import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { route } from '../routes/route.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: "*",
    credentials: true,
    methods: ['GET'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', route);
app.all('*', (_, res) => {
    res.status(404).json({ message: "Ooops route not found" })
})
app.listen(port, () => {
    console.log(`Server is running on port http://127.0.0.1:${port}`);
});



