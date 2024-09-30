require('dotenv').config();
const express = require('express');
const logger = require('./utilities/logger');
const routes = require('./routes');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi/openapi.yml');

const app = express();
const api_version = '/api/v1'

// Serve Swagger UI at /api-docs
app.use(`${api_version}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(api_version, routes);
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`File management service running on port ${port}`);
});
