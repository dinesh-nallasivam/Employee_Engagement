const bcrypt = require('bcrypt');
const prisma = require("../../index")

const addEmployee = async (req,res)=>{
    const { email, name, password, department, team, role } = req.body;
    
    if(!email || !name || !password || !department || !team || !role){
        return res.status(404).json({message:"Please provide all neccessary details"})
    }
    
    const image = req.file;

    if (!image) {
        return res.status(400).json({ message: 'No image uploaded' });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const newEmployee = await prisma.employee.create({
            data: {
                email,
                name,
                password:hashedPassword,
                department,
                team,
                role: role || 'USER',
                image: `/uploads/${image.filename}` 
            },
        });
        res.status(201).json(newEmployee);

    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message });
    }
}

module.exports = { addEmployee }