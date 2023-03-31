import { parse } from 'node-html-parser';
import fetch from 'node-fetch';

const url = 'https://adventurerock.com';
const gymIds = {
  BRK: ['facility-count', 'count', 'capacity'],
  MKE: ['facility-count', 'count', 'capacity'],
  WKP: ['facility-count', 'count', 'capacity'],
};

fetch(url)
  .then(res => res.text())
  .then(html => {
    const root = parse(html);
        // console.log(root);
    for (const [gym, ids] of Object.entries(gymIds)) {
      console.log(`IDs for gym ${gym}:`);
      for (const id of ids) {
        const elem = root.querySelector(`#${gym}-${id}`);
        if (elem) {
          console.log(`- ${id}: ${elem.text}`);
        } else {
          console.log(`- ${id}: not found`);
        }
      }
    }
  })

  .catch(err => console.error(err));