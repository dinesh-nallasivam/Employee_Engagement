const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword1 = await bcrypt.hash("1234", 10)

  await prisma.employee.create({
    data:{
        name: "dinesh",
        email: "dinesh@gmail.com",
        password: hashedPassword1,
        department: "IT",
        team:"A",
        role: "ADMIN"
    }
  });

  console.log('Database seeded!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
