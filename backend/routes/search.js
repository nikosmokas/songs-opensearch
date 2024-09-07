const express = require('express');
const router = express.Router();
const client = require('../services/opensearchClient'); // Ensure this path is correct

router.get('/search', async (req, res) => {
  const query = req.query.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await client.search({
      index: 'songs', // Your index name here
      body: {
        query: {
          multi_match: {
            query: query,
            fields: ['title', 'artist', 'album']
          }
        }
      }
    });

    res.json(response.body.hits.hits);
  } catch (error) {
    console.error('An error occurred while searching:', error);
    res.status(500).json({ error: 'An error occurred while searching' });
  }
});

module.exports = router;
