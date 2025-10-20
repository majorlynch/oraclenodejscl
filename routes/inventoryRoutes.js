import express from 'express';
import inventoryController from '../controllers/inventoryController.js';
import { authenticateToken } from '../middleware/authmiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /inventory/inventorycount/{storeId}/{productId}:
 *   get:
 *     summary: Get the total inventory for a specific product in a specific store
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: false
 *         schema:
 *         type: integer
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Total inventory count
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   product_inventory:
 *                     type: integer
 */
router.route('/inventorycount/:storeId/:productId').get(authenticateToken, inventoryController.getProductInventory);

export default router;
