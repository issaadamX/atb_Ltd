const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testAppointment() {
  try {
    console.log('Testing database connection...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected');
    
    // Test appointment creation
    const testAppointment = await prisma.appointment.create({
      data: {
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '0123456789',
        service: 'Test Service',
        message: 'Test message'
      }
    });
    
    console.log('✅ Appointment created:', testAppointment);
    
    // Clean up
    await prisma.appointment.delete({
      where: { id: testAppointment.id }
    });
    
    console.log('✅ Test appointment deleted');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAppointment();