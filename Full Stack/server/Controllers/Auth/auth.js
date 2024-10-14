const prisma = require("../../index")
const bcrypt = require('bcrypt')
const jwt  = require("jsonwebtoken")
const {promisify} = require("util");

const login = async(req,res)=>{
    try{
        const {email, password,role}  = req.body
        
        if(!email || !password || !role){
            return res.status(404).json({message:"Need the User name and password"})
        }
        const employee = await prisma.employee.findUnique({where:{email,role:role.toUpperCase()}})
        
        if (!employee) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const result = await bcrypt.compare(password,employee.password)
       
        if(!result){
            return res.status(401).json({message:"Please enter the correct password"})
        }
        
        const token = jwt.sign({
                employeeId: employee.id,
                role:employee.role
            }, 
            process.env.JWT_SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRY_DAY
        });

        const options = {
            expires : new Date(Date.now()+process.env.JWT_COOKIE_EXPIRY_DAY* 60 * 60 * 1000),
            httpOnly:true
        }
        
        res.cookie("Authentication",token,options)
        
        return res.status(200).json({message: "Login successful",data:employee.role})

    }catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ message: "Error fetching data", error: err.message });
    }
}

const logout = (req,res)=>{
    const token = (req.cookies.Authentication);
    if(token){
        res.cookie("Authentication","")
        return res.status(200).json({message: "Logout successful"})
    }
    
}

const protection = async(req,res,next)=>{
    const token = (req.cookies.Authentication);
    
    try{
        if (!token) {
            return res.status(400).json({
                message: "You have being logged out."
            });
        }
        const {employeeId,role} = await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY)

        const employee = await prisma.employee.findUnique({where:{id:employeeId,role}})
        if (!employee) {
            return res.status(401).json({
                message: "The employee doesn't not exists."
            });
        }
        
        req.employeeId = employee.id;
        req.employeeRole = employee.role;
        next()
    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            message: error.message
        });
    }
}

const protectionUser = async(req,res,next)=>{
    const token = (req.cookies.Authentication);
    
    try{
        if (!token) {
            return res.status(400).json({
                message: "You have being logged out."
            });
        }
        const {employeeId,role} = await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY)

        if(role != "USER"){
            return res.status(401).json({
                message: "You don't havee access to this site."
            });
        }

        const employee = await prisma.employee.findUnique({where:{id:employeeId,role}})
        if (!employee) {
            return res.status(401).json({
                message: "The employee doesn't not exists."
            });
        }
        
        req.employeeId = employee.id;
        req.employeeRole = employee.role;
        next()
    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            message: error.message
        });
    }
}

const protectionAdmin = async(req,res,next)=>{
    const token = (req.cookies.Authentication);
    
    try{
        if (!token) {
            return res.status(400).json({
                message: "You have being logged out."
            });
        }
        const {employeeId,role} = await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY)

        if(role != "ADMIN"){
            return res.status(401).json({
                message: "You don't havee access to this site."
            });
        }

        const employee = await prisma.employee.findUnique({where:{id:employeeId,role}})
        if (!employee) {
            return res.status(401).json({
                message: "The employee doesn't not exists."
            });
        }
        
        req.employeeId = employee.id;
        req.employeeRole = employee.role;
        next()
    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { login, protection, protectionUser, protectionAdmin, logout }