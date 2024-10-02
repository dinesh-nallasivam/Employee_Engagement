
const prisma = require("../../index")

const addEmployee = async (req,res)=>{
    const { email, name, password, department, team, role } = req.body;
    
    if(!email || !name || !password || !department || !team || !role){
        return res.status(404).json({message:"Please provide all neccessary details"})
    }

    try {
        const newEmployee = await prisma.employee.create({
            data: {
                email,
                name,
                password,
                department,
                team,
                role: role || 'USER',
            },
        });
        res.status(201).json(newEmployee);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { addEmployee }