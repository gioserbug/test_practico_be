const axios = require('axios');

const externalApi = axios.create({
  baseURL: 'https://api.mercadolibre.com/',
});

module.exports = externalApi;
