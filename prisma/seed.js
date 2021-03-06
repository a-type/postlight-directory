const { PrismaClient } = require('@prisma/client');
const faker = require('faker');

// these have to be unique... just using a Set for now to do that. This means
// there may not be 10 total departments, but that's ok.
const departments = Array.from(
  new Set(new Array(10).fill(null).map(() => faker.name.jobArea())),
);

const employees = new Array(500).fill(null).map(() => ({
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  title: faker.name.jobTitle(),
  profileImageUrl: faker.internet.avatar(),
  location: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
}));

const client = new PrismaClient();

async function seed() {
  try {
    console.info(`Seeding database`);
    // using for-loops to avoid overloading the database with hundreds of parallel queries
    const departmentModels = [];
    for (let dept of departments) {
      try {
        const departmentModel = await client.department.create({
          data: {
            name: dept,
          },
        });
        departmentModels.push(departmentModel);
      } catch (err) {
        console.warn(err);
        console.warn('Ignoring that and continuing...');
      }
    }

    const employeeModels = [];
    for (let emp of employees) {
      try {
        const employeeModel = await client.employee.create({
          data: {
            ...emp,
            department: {
              connect: {
                // choosing a random department
                id:
                  departmentModels[
                    Math.floor(Math.random() * departmentModels.length)
                  ].id,
              },
            },
          },
        });
        employeeModels.push(employeeModel);
      } catch (err) {
        console.warn(err);
        console.warn('Ignoring that and continuing...');
      }
    }

    console.info(
      `Seeding complete! ${departmentModels.length} departments, ${employeeModels.length} employees created`,
    );
  } catch (err) {
    console.error(err);
    console.info(`There was an error while seeding.`);
  }

  process.exit();
}

seed();
