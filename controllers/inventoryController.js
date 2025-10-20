import inventoryService from '../services/inventoryService.js';

async function getProductInventory(req, res) {
    try {
        let storeId = req.params.storeId;
        if (storeId === '{storeId}' || !storeId) {
            storeId = null;
        }
        const productId = req.params.productId;
        const productInventory = await inventoryService.getProductInventory(productId, storeId);
        res.status(200).json(productInventory);
    }
    catch (error) {
        res.status(500).json({ message: error.message, source: 'controller' });
    };
}

export default { getProductInventory };