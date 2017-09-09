// Import
const db = require('../../db.js');
const fetch = require('node-fetch');

// Functions
async function fetchOnePage (request, response) {
  const url = 'http://oda.ft.dk/api/' + request.params.searchCriteria;
  const openData = await fetchOpenData(url);
  response.send(openData)
}

async function fetchOpenData (searchCriteria) {
  const openData = await fetch(searchCriteria).then(function (data) {
    return data.json();
  });
  return openData;
}

async function fetchNextPage (nextPageUrl, page) {
  const nextPage = await fetchOpenData(nextPageUrl);
  var pages = await page.concat(nextPage.value);
  if (await nextPage['odata.nextLink']) {
    return fetchNextPage(nextPage['odata.nextLink'], pages)
  } else {
    return await pages;
  }
}

async function fetchAllPages (request, response) {
  var allPages = await fetchNextPage('http://oda.ft.dk/api/' + request.params.searchCriteria, []);
  response.send(allPages)
}

// Export
module.exports = {
  fetchOnePage: fetchOnePage,
  fetchAllPages: fetchAllPages
}
