const express = require("express")
const authRouter = require('./Routes/authRouter.js')
const adminRouter = require('./Routes/adminRouter.js')
const dashboardRouter = require('./Routes/dashboardRouter.js')
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

app.use("/authentication",authRouter)

app.use("/admin",adminRouter)

app.use("/dashboardRouter",dashboardRouter)


app.listen(PORT,()=>{console.log("server started")})