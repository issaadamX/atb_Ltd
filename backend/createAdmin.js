const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await prisma.adminUser.upsert({
      where: { email: 'admin@abc-sarl.com' },
      update: {},
      create: {
        username: 'admin',
        email: 'admin@abc-sarl.com',
        password: hashedPassword,
        role: 'admin'
      }
    });
    
    console.log('✅ Admin user created/updated:');
    console.log('Email: admin@abc-sarl.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();