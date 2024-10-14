const express = require("express")
const authRouter = require('./Routes/authRouter.js')
const adminRouter = require('./Routes/adminRouter.js')
const employeeRouter = require('./Routes/employeeRouter.js')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { config } = require('dotenv');
config();

const PORT=process.env.PORT || 3000;

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/uploads', express.static('Routes/uploads'));

app.use("/authentication",authRouter)

app.use("/admin",adminRouter)

app.use("/employee",employeeRouter)

app.listen(PORT,()=>{console.log("server started")})