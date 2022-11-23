// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');
const { Project, Administrator } = require('../models');

const fakeProject = async () => {
  try {
    const admin = await Administrator.findOne({
      email: 'admin@gmail.com',
    }).lean();

    await Project.deleteMany({});

    const vestingMonthStart = [1, 2, 3, 4, 5, 6, 7];
    const boolean = [false, true];

    for (let i = 0; i < 100; i += 1) {
      const name = faker.company.bs();
      const slug = name.split(' ').join('-');
      // eslint-disable-next-line no-await-in-loop
      await Project.create({
        name,
        slug,
        circulatingSupply: 0,
        description: faker.lorem.paragraph(2),
        ticker: faker.name.firstName(),
        logo: faker.internet.avatar(),
        // categories,
        distributionTimeline: {
          timezone: 'Asia/Saigon',
          time: Date.now(),
          title: faker.name.jobTitle(),
          description: faker.lorem.paragraph(2),
          isDisplayDate: false,
          isDisplayTime: false,
        },
        links: {
          linkType: 'WEBSITE',
          url: faker.internet.url(),
        },
        allocations: [
          {
            title: faker.name.jobTitle(),
            percent: 10,
          },
          {
            title: faker.name.jobTitle(),
            percent: 20,
          },
          {
            title: faker.name.jobTitle(),
            percent: 23,
          },
          {
            title: faker.name.jobTitle(),
            percent: 47,
          },
        ],
        totalSupply: faker.datatype.number({ min: 10000000, max: 1000000000000 }),
        tgeSummary: [
          {
            title: faker.name.jobTitle(),
            value: '0.43333',
            valueType: 'TEXT',
          },
          {
            title: faker.name.jobTitle(),
            value: '11',
            valueType: 'NUMBER',
          },
          {
            title: faker.name.jobTitle(),
            value: '5',
            valueType: '%',
          },
          {
            title: faker.name.jobTitle(),
            value: '0.1253',
            valueType: 'USD',
          },
        ],
        vestingSchedule: [
          {
            title: faker.name.jobTitle(),
            description: faker.lorem.paragraph(1),
            tgeUnlock: 7,
            tokenPrice: faker.datatype.number({ precision: 0.001, max: 1, min: 0.001 }),
            cliffMonths: 1,
            vestingMonths: 3,
          },
          {
            title: faker.name.jobTitle(),
            description: faker.lorem.paragraph(1),
            tgeUnlock: 2,
            tokenPrice: faker.datatype.number({ precision: 0.001, max: 1, min: 0.001 }),
            cliffMonths: 2,
            vestingMonths: 4,
          },
          {
            title: faker.name.jobTitle(),
            description: faker.lorem.paragraph(1),
            tgeUnlock: 11,
            tokenPrice: faker.datatype.number({ precision: 0.001, max: 1, min: 0.001 }),
            cliffMonths: 4,
            vestingMonths: 2,
          },
        ],
        vestingMonthStart: vestingMonthStart[Math.floor(Math.random() * vestingMonthStart.length)],
        vestingRoiMaxPrice: faker.datatype.number({ precision: 0.1, max: 10, min: 0.1 }),
        createdBy: admin._id,
        isPublished: boolean[Math.floor(Math.random() * boolean.length)],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = fakeProject;
