import customerRepository from '../repositories/customerRepository.js';

async function getCustomers(page, pageSize) {
    return await customerRepository.getCustomers(page, pageSize);
}

async function getCustomerById(customer_id) {
    if (!customer_id || isNaN(customer_id)) {
        throw new Error('Invalid customer_id');
    }
    const customer = await customerRepository.getCustomerById(customer_id);
    if (!customer) {
        throw new Error('Customer not found');
    }
    return customer;
}

async function createCustomer(customer_id, email_address, full_name) {
    return await customerRepository.createCustomer(customer_id, email_address, full_name);
}

async function updateCustomer(customer){
    return await customerRepository.updateCustomer(customer);
}

async function deleteCustomer(customer_id){
    return await customerRepository.deleteCustomer(customer_id);
}

export default { getCustomerById, getCustomers, createCustomer, updateCustomer, deleteCustomer };

