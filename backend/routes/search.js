// routes/search.js
const express = require("express");
const router = express.Router();
const client = require("../services/opensearchClient");

// Search route
router.get("/", async (req, res) => {
  console.log("Query params:", req.query); // Debugging line
  try {
    // Define your search query
    const query = {
      index: "songs",
      body: {
        query: {
          match: {
            title: req.query.q, // Should match frontend parameter
          },
        },
      },
    };

    // Perform search operation
    const response = await client.search(query);

    // Send search results
    res.json(response.body.hits.hits);
  } catch (error) {
    console.error("Error occurred while searching:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
