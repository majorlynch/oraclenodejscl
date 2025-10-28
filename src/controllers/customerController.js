import customerService from '#services/customerService.js';

async function getCustomers(req, res) {
    try {
        const page = req.params.page;
        const pageSize = req.params.pageSize;
        const retrievalMethod = req.params.retrievalMethod;

        const customers = await customerService.getCustomers(page, pageSize, retrievalMethod);
        res.status(200).json(customers);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getCustomerById(req, res) {
    try {
        const customerId = req.params.customerId;
        const customer = await customerService.getCustomerById(customerId);
        res.status(200).json(customer);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createCustomer(req, res) {
    try {
        const { customerId, email_address, full_name } = req.body;
        const result = await customerService.createCustomer(customerId, email_address, full_name);
        res.status(201).json({
            message: 'Customer created',
            customerId,
            email_address,
            full_name,
            result
        });
    } catch (err) {
        console.error('Error creating customer:', err.message);
        res.status(500).send(err.message);
    }
}

async function updateCustomer(req, res) {
    try {
        const customer = req.body;
        const result = await customerService.updateCustomer(customer);
        res.status(200).json({
            message: 'Customer updated',
            customer
        });
    } catch (err) {
        console.error('Error updating customer:', err.message);
        res.status(500).send(err.message);
    }
}

async function deleteCustomer(req, res) {
    try {
        const { customerId } = req.params;
        const result = await customerService.deleteCustomer(customerId);
        res.status(200).json({
            message: 'Customer deleted',
            customerId
        });
    } catch (err) {
        console.error('Error deleting customer:', err.message);
        res.status(500).send(err.message);
    }
}

async function createCustomers(req, res) {
    try {
        const customerList = req.body;
        const result = await customerService.createCustomers(customerList);
        res.status(201).json({
            message: 'Customers created',
            result
        });
    } catch (err) {
        console.error('Error creating customers:', err.message);
        res.status(500).send(err.message);
    }
}

export default { getCustomerById, getCustomers, createCustomer, updateCustomer, deleteCustomer, createCustomers };