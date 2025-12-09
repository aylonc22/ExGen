import express from 'express'
import cors from 'cors'
import userRouter from './routes/user';
import { connectDB } from '../mongo/db';
const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = [`http://localhost:${port}`, "https://yourdomain.com"];

app.use(
    cors({
        origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.json());



app.use('/user', userRouter);

app.listen(port,async  () => {
    await connectDB();
    console.log(`Server running on http://localhost:${port}`);
});
