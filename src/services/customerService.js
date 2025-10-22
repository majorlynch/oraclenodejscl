import customerRepository from '../repositories/customerRepository.js';

async function getCustomers(page, pageSize) {
    return await customerRepository.getCustomers(page, pageSize);
}

async function getCustomerById(customerId) {
    if (!customerId || isNaN(customerId)) {
        throw new Error('Invalid customerId');
    }
    const customer = await customerRepository.getCustomerById(customerId);
    if (!customer) {
        throw new Error('Customer not found');
    }
    return customer;
}

async function createCustomer(customerId, email_address, full_name) {
    return await customerRepository.createCustomer(customerId, email_address, full_name);
}

async function updateCustomer(customer){
    return await customerRepository.updateCustomer(customer);
}

async function deleteCustomer(customerId){
    return await customerRepository.deleteCustomer(customerId);
}
async function createCustomers(customerList){
    return await customerRepository.createCustomers(customerList);
}

export default { getCustomerById, getCustomers, createCustomer, updateCustomer, deleteCustomer, createCustomers };

