import express from 'express';
import { authenticateToken } from '../middleware/authmiddleware.js';
import orderController from '../controllers/orderController.js';

const router = express.Router();

/**
 * @swagger
 * /orders/{customerId}:
 *   get:
 *     summary: Get all customers
 *     tags: [Orders]
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
 *         description: A list of orders for a customer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

router.route('/:customerId').get(authenticateToken, orderController.getCustomerOrders);

export default router;
