import express from 'express';
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
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
app.use('/auth', authRoutes);
app.use('/customers', customerRoutes);

app.listen(PORT);

