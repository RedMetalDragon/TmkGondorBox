require('dotenv').config();
const express = require('express');
const logger = require('./utilities/logger');
const routes = require('./routes');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi/openapi.yml'); 

const app = express();
app.use(express.json());

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`File management service running on port ${port}`);
});
