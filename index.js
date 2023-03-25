const https = require('https');
const { parse } = require('node-html-parser');

exports.handler = async (event) => {
  const url = 'https://adventurerock.com/';

  const getPageHTML = async (url) => {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
  };

  const html = await getPageHTML(url);
  const root = parse(html);

  const locations = {
    Brookfield: '',
    WalkersPoint: '',
    Downtown: ''
  };

  const occupancyElements = root.querySelectorAll('.rmOccupancy');

  occupancyElements.forEach((element) => {
    const locationName = element.parentNode.parentNode.parentNode.querySelector('.rmTitle').childNodes[0].rawText.trim();
    if (locationName in locations) {
      const occupancy = element.childNodes[0].rawText.trim();
      locations[locationName] = occupancy;
    }
  });

  console.log('Occupancy data:', locations);

  return {
    statusCode: 200,
    body: JSON.stringify(locations),
    headers: {
      'Content-Type': 'application/json'
    }
  };
};
