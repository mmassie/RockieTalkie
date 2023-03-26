import axios from 'axios';
import { parse } from 'node-html-parser';

const axios = require('axios');
const { parse } = require('node-html-parser');

exports.handler = async (event, context) => {
  const url = 'https://adventurerock.com/';
  
  try {
    const response = await axios.get(url);
    const html = response.data;
    const root = parse(html);
    
    const locations = ['Brookfield', 'Walkers Point', 'Downtown'];
    const occupancy = {};
    
    locations.forEach(location => {
      const count = root.querySelector(`#${location.toLowerCase()} #count`).rawText.trim();
      const capacity = root.querySelector(`#${location.toLowerCase()} #capacity`).rawText.trim();
      
      occupancy[location] = { count, capacity };
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(occupancy)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error scraping occupancy data' })
    };
  }
  echo JSON.stringify(occupancy);
};