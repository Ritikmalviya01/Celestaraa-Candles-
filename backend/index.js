import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import morgan from 'morgan';
import helmet, { crossOriginResourcePolicy } from 'helmet';
import cookieParser from 'cookie-parser';
import connectDb from './config/connectDb.js';
import userRouter from './routes/user.route.js';
import adminRouter from './routes/admin.routes.js';
import blogRouter from './routes/blog.routes.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

dotenv.config()

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

// app.use(cors({
//     credentials: true,
//     origin: process.env.FRONTEND_URL
// }))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(helmet( {
    crossOriginResourcePolicy : false
}
))


// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const PORT = process.env.PORT || 8000 

app.get("/", (req,res) =>{
    res.json({message: "Hello from server " + PORT})
})

app.use('/api/user' , userRouter );
app.use('/api/admin', adminRouter);
app.use('/api/blog' , blogRouter)



connectDb()
.then(() => {
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // app.use("/uploads", express.static(path.join(__dirname, "uploads")));

})
})