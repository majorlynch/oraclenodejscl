// routes/customers.js
import express from 'express';
//const { connectionProperties, getConnection, releaseConnection } = require('../db/oracle');
import customerController from '../controllers/customerController.js';
import { authenticateToken } from '../middleware/authmiddleware.js';
import customerService from '../services/customerService.js';


const router = express.Router();

router.use(function (req, res, next) {
    console.log("REQUEST:" + req.method + "   " + req.url);
    console.log("BODY:" + JSON.stringify(req.body));
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    //     res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/**
 * @swagger
 * /customers/{page}/{pageSize}:
 *   get:
 *     summary: Get all customers
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         schema:
 *         type: integer
 *       - in: path
 *         name: pageSize
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   customer_id:
 *                     type: integer
 *                   email_address:
 *                     type: string
 *                   full_name:
 *                     type: string
 */

//router.route('/customers/:page/:pageSize').get(customerController.getCustomers);
router.get('/:page/:pageSize', authenticateToken, customerController.getCustomers);

/**
 * @swagger
 * /customers/{customer_id}:
 *   get:
 *     summary: Get customer by ID or name
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   customer_id:
 *                     type: integer
 *                   email_address:
 *                     type: string
 *                   full_name:
 *                     type: string
 */

router.route('/:customer_id').get(authenticateToken, customerController.getCustomerById);

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - email_address
 *               - full_name
 *             properties:
 *               customer_id:
 *                 type: integer
 *               email_address:
 *                 type: string
 *               full_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 customer_id:
 *                   type: integer
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route('/').post(authenticateToken, customerController.createCustomer);

/**
 * @swagger
 * /customers:
 *   put:
 *     summary: Update a customer
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - email_address
 *               - full_name
 *             properties:
 *               customer_id:
 *                 type: integer
 *               email_address:
 *                 type: string
 *               full_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 customer_id:
 *                   type: integer
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route('/').put(authenticateToken, customerController.updateCustomer);

/**
 * @swagger
 * /customers/{customer_id}:
 *   delete:
 *     summary: Delete a customer
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 customer_id:
 *                   type: integer
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route('/:customer_id').delete(authenticateToken, customerController.deleteCustomer);

export default router;
