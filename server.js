const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const cors = require('cors');
const customerRoutes = require('./routes/customers');
const config = require('./config/dbconfig');

const app = express();

process.on('unhandledRejection', (reason, p) => {
    console.error("Unhandled Rejection at: ", p, " reason: ", reason);
    // application specific logging, throwing an error, or other logic here
});

const PORT = process.env.PORT || 8080;

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors({ origin: '*', credentials: true }));
app.use('/', customerRoutes);

app.listen(PORT);

