/* eslint-disable func-names */
const axios = require('axios');
const cheerio = require('cherio/lib/cheerio');
const aws = require('aws-sdk');

const { Project, Administrator } = require('../models');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION_CODE,
});

const s3 = new aws.S3();

const uploadFileToS3 = async (url, key) => {
  const { data, headers } = await axios.get(url, { responseType: 'arraybuffer', responseEncoding: 'binary' });

  const params = {
    ContentType: headers['content-type'],
    Bucket: process.env.AWS_BUCKET,
    Body: data,
    Key: key,
    ACL: 'public-read',
  };
  await s3.putObject(params).promise();

  return `https://vestcalendar.s3.ap-southeast-1.amazonaws.com/${key}`;
};

const crawler = async (url, createdBy) => {
  const { data } = await axios.get(url);

  // const data = fs.readFileSync('data.txt');
  // await fs.writeFileSync('data.txt', data);

  const $ = cheerio.load(data);

  const ticker = $('.text-body').eq(0).text().trim();
  const name = $('.text-muted').eq(1).text().trim();
  const description = $('.js-ajax-content').eq(0).find('p').eq(0)
    .text()
    .trim();

  const coingeckoId = $('vestlab-token-price').attr('token-id') && $('vestlab-token-price').attr('token-id').trim();
  const logo = $('img[class*="js-token-icon"]').attr('src');

  const supplyData = $('table:contains("Circulating supply") td');

  const circulatingSupply = supplyData.eq(1).text().replace(/\D/g, '') || 0;
  // const lockSupply = supplyData.eq(3).text().replace(/\D/g, '');
  const totalSupply = supplyData.eq(5).text().replace(/\D/g, '') || 0;

  const distributionTimeline = [];

  let timelineItem;
  let timelineItemObject;
  let displayType;

  $('.timeline-item').slice(1).each(function () {
    timelineItem = $(this).find('vestlab-countdown').attr('time');
    if (timelineItem) {
      timelineItemObject = JSON.parse($(this).find('vestlab-countdown').attr('time'));
      displayType = $(this).find('vestlab-countdown').attr('show');
      distributionTimeline.push({
        timezone: timelineItemObject.zone,
        time: timelineItemObject.time,
        title: $(this).find('.timeline-content p').text().trim(),
        description: $(this).find('.timeline-content .timeline-content-info').text().trim(),
        isDisplayDate: displayType === 'full' || displayType === 'date',
        isDisplayTime: displayType === 'full',
      });
    }
  });

  const links = [];
  $('.js-ajax-content a').each(function () {
    if ($(this).attr('title')) {
      links.push({
        linkType: $(this).attr('title'),
        url: $(this).attr('href'),
      });
    }
  });

  const allocations = JSON.parse($('.js-chart-donut').attr('data-chart'))
    .map(e => ({ title: e.label, percent: e.value }));

  const tgeSummary = [];

  const tge = $('.js-ajax-content:contains("TGE summary") tr');

  tge.each(function () {
    let value = $(this).find('td').eq(1).text()
      .trim();
    let valueType = '';

    if (value[0] === '$') {
      value = value.replace(/\D/g, '');
      valueType = 'USD';
    } else if (value[value.length - 1] === '%') {
      value = value.replace('%', '');
      valueType = '%';
    } else if (/[A-Za-z]/.test(value)) {
      valueType = 'TEXT';
    } else {
      value = value.replace(/\D/g, '');
      valueType = 'NUMBER';
    }

    tgeSummary.push({
      title: $(this).find('td').eq(0).text()
        .trim(),
      value,
      valueType,
    });
  });


  let vestingSchedule = [];
  let vestingRoiMaxPrice = 0;
  let vestingMonthStart = '';

  if ($('vestlab-vesting-schedule').attr('table')) {
    const vestingScheduleData = JSON.parse($('vestlab-vesting-schedule').attr('table'));

    const { startMonth, forceMaxPrice, rows } = vestingScheduleData;
    vestingMonthStart = `${startMonth.split('-')[2]}-${startMonth.split('-')[1]}`;
    vestingRoiMaxPrice = forceMaxPrice;

    vestingSchedule = rows.map(e => ({
      title: e.title,
      tgeUnlock: Number(e.percent) || 0,
      description: e.description,
      tokenPrice: Number(e.price) || 0,
      cliffMonths: e.cliffDuration,
      vestingMonths: e.vestingDuration,
    }));
  }

  const slug = coingeckoId || `${ticker}-${Math.random().toString(36).substr(7)}`;
  const s3Logo = await uploadFileToS3(logo, `${slug}.${logo.split('?')[0].split('.').reverse()[0]}`);

  await Project.create({
    name,
    slug,
    ticker,
    description,
    coingeckoId,
    logo: s3Logo,
    distributionTimeline,
    links,
    totalSupply: totalSupply || 0,
    allocations,
    tgeSummary,
    vestingSchedule,
    vestingMonthStart,
    vestingRoiMaxPrice,
    isPublished: true,
    createdBy,
    circulatingSupply,
  });
};

const crawlerAll = async () => {
  const admin = await Administrator.findOne().lean();
  const { data } = await axios.get('https://vestlab.io/autocomplete/tokens');

  for (let i = 0; i < data.length; i += 1) {
    console.log(`${i + 1}. https://vestlab.io/${data[i].data.sef_id}`);
    // eslint-disable-next-line no-await-in-loop
    await crawler(`https://vestlab.io/${data[i].data.sef_id}`, admin._id);
  }
};

module.exports = {
  crawlerAll,
};
