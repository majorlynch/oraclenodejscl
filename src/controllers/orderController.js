import orderRepository from "#repositories/orderRepository.js";

async function getCustomerOrders(req, res) {
    try {
        const customerId = req.params.customerId;
        const retrievalMethod = req.params.retrievalMethod;
        if (customerId === '{customerId}' || !customerId) {
            storeIcustomerId = null;
        }
        const orderList = await orderRepository.getCustomerOrders(customerId, retrievalMethod);
        res.status(200).json(orderList);
    }
    catch (error) {
        res.status(500).json({ message: error.message, source: 'controller' });
    };
}

export default { getCustomerOrders };