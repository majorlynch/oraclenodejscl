import inventoryRepostory from '#repositories/inventoryRepository.js';

async function getProductInventory(productId, storeId) {
    if (!productId || isNaN(productId)) {
        throw new Error('Invalid productId');
    }
    const productInventory = await inventoryRepostory.getProductinventory(productId, storeId);
    if (!productInventory) {
        throw new Error('Inventory not found');
    }
    return productInventory;
}

export default { getProductInventory };