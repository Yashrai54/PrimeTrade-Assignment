const express = require('express');
const cors=require('cors')
const cookieParser=require('cookie-parser')
const connectDb = require('./config/db');
const dotenv = require('dotenv');
const userrouter=require('./routes/user.routes.js')
dotenv.config();

const app = express();


connectDb();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

const authRoutes = require('./routes/authRoutes');
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks',userrouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
