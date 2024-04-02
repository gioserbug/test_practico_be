const express = require('express');
const externalApi = require('./externalApi');
const {
  standardResponseByItem,
  standardResponseAllItems,
} = require('./standardResponse');

const app = express();
const PORT = 5000;
const ENDPOINT_BASE = '/api/items';
const MESSAGE_SERVER_ERROR = 'Internal Server Error';

app.get(ENDPOINT_BASE, async (req, res) => {
  const query = req.query.q;

  if (!query) return res.json({ result: [] });

  try {
    const response = await externalApi.get(`sites/MLA/search?q=${query}`);
    const dataStandard = standardResponseAllItems(response.data);
    res.json(dataStandard);
  } catch (error) {
    res.status(500).json({
      message: error.response?.data?.message || MESSAGE_SERVER_ERROR,
    });
  }
});

app.get(`${ENDPOINT_BASE}/:id`, async (req, res) => {
  const idItem = req.params.id;
  try {
    const itemPromise = externalApi.get(`items/${idItem}`);
    const descriptionPromise = externalApi.get(`items/${idItem}/description`);

    const [responseItem, responseDescription] = await Promise.all([
      itemPromise,
      descriptionPromise,
    ]);

    const dataStandard = standardResponseByItem(
      responseItem.data,
      responseDescription.data,
    );

    res.json(dataStandard);
  } catch (error) {
    res.status(500).json({
      message: error.response?.data?.message || MESSAGE_SERVER_ERROR,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
