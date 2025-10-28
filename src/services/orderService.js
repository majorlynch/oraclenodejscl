import orderRepository from "#repositories/orderRepository";

async function getCustomerOrders(customerId, retrievalMethod) {
    if (!customerId || isNaN(customerId)) {
        throw new Error('Invalid productId');
    }
    const orderList = await orderRepository.getCustomerOrders(customerId, retrievalMethod);
    if (!orderList) {
        throw new Error('Order List not found');
    }
    return orderList;
}

export default { getCustomerOrders };