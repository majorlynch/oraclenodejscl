import express from 'express';
import customerController from '#controllers/customerController.js';
import { authenticateToken } from '#middleware/authmiddleware.js';


const router = express.Router();


/**
 * @swagger
 * /customers/{page}/{pageSize}/{retrievalMethod}:
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
 *           type: integer
 *       - in: path
 *         name: pageSize
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: retrievalMethod
 *         description: R for resultset, D for direct fetch
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *           default: R
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
 *                   customerId:
 *                     type: integer
 *                   email_address:
 *                     type: string
 *                   full_name:
 *                     type: string
 */

router.get('/:page/:pageSize/:retrievalMethod', authenticateToken, customerController.getCustomers);

/**
 * @swagger
 * /customers/{customerId}:
 *   get:
 *     summary: Get customer by ID or name
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
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
 *                   customerId:
 *                     type: integer
 *                   email_address:
 *                     type: string
 *                   full_name:
 *                     type: string
 */

router.route('/:customerId').get(authenticateToken, customerController.getCustomerById);

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
 *               - email_address
 *               - full_name
 *             properties:
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
 *                 customerId:
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
 *               - customerId
 *               - email_address
 *               - full_name
 *             properties:
 *               customerId:
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
 *                 customerId:
 *                   type: integer
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route('/').put(authenticateToken, customerController.updateCustomer);

/**
 * @swagger
 * /customers/{customerId}:
 *   delete:
 *     summary: Delete a customer
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
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
 *                 customerId:
 *                   type: integer
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route('/:customerId').delete(authenticateToken, customerController.deleteCustomer);

/**
 * @swagger
 * /customers/createcustomers:
 *   post:
 *     summary: Create multiple customers
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - emailAddress
 *                 - fullName
 *               properties:
 *                 emailAddress:
 *                   type: string
 *                 fullName:
 *                   type: string
 *     responses:
 *       201:
 *         description: Customers created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 createdCount:
 *                   type: integer
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route('/createcustomers').post(authenticateToken, customerController.createCustomers);

export default router;
