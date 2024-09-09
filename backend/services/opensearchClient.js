const { Client } = require("@opensearch-project/opensearch");
const { AwsSigv4Signer } = require("@opensearch-project/opensearch/aws");
const AWS = require("aws-sdk");
require("dotenv").config();

// Create an AWS credentials provider
const credentialsProvider = () => {
  return new Promise((resolve, reject) => {
    AWS.config.getCredentials((err, credentials) => {
      if (err) reject(err);
      else resolve(credentials);
    });
  });
};

// Initialize OpenSearch client with AWS SigV4 signer
const client = new Client({
  node: process.env.OPENSEARCH_HOST,
  ...AwsSigv4Signer({
    region: "eu-north-1",
    service: "es",
    getCredentials: credentialsProvider,
  }),
});

module.exports = client;
