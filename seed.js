const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();
const GENDERS = ['Male', 'Female'];

async function seed() {
  try {
    console.log('Connected to database via Prisma...');

    // Clear existing data? Optional.
    // await prisma.oPT_Party.deleteMany({}); 

    const recordsToCreate = 100;
    const data = [];

    for (let i = 0; i < recordsToCreate; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const phone = faker.phone.number('##########');
      const ssn = faker.string.numeric(3) + '-' + faker.string.numeric(2) + '-' + faker.string.numeric(4); // Simple SSN format
      const gender = faker.helpers.arrayElement(GENDERS);
      const age = faker.number.int({ min: 10, max: 90 });

      // Truncate to ensure safety
      const safeFirstName = firstName.substring(0, 100);
      const safeLastName = lastName.substring(0, 100);
      const safePhone = phone.substring(0, 20);
      const safeSSN = ssn.substring(0, 20);

      try {
        await prisma.oPT_Party.create({
          data: {
            PTY_FirstName: safeFirstName,
            PTY_LastName: safeLastName,
            PTY_Phone: safePhone,
            PTY_SSN: safeSSN,
            PTY_Gender: gender,
            PTY_Age: age
          }
        });
        process.stdout.write('.');
      } catch (innerErr) {
        console.error('\nFailed to create record:', innerErr.message);
      }
    }
    console.log(`\nSeeding process finished.`);
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
