import oracledb from 'oracledb';
import pool from '../db/oraclePool.js';

async function getCustomers(page, pageSize) {
    const offset = (page - 1) * pageSize;
    console.log(page);
    console.log(pageSize);
    console.log(offset);

    let connection;
    try {
        connection = await pool.getConnection();
        const result = await connection.execute(`select customer_id, email_address, full_name
                                                 from customers
                                                 order by customer_id
                                                 offset :offset rows fetch next :pageSize rows only`,
      {
        offset,
        pageSize
      },
            { outFormat: oracledb.OUT_FORMAT_OBJECT });
        return result.rows;
    } catch (err) {
        console.error('Error closing connection:', err.message);
        throw err;
    } finally {
        connection?.close().catch(err => { console.error('Error closing connection:', err.message); });
    }
}

async function getCustomerById(customer_id) {
    let connection;
    try {
        connection = await pool.getConnection();
        const customerIdNum = Number(customer_id); // or parseInt(customer_id, 10)
        const result = await connection.execute(`select customer_id, email_address, full_name
                                             from customers
                                             where customer_id = :customer_id
                                             order by customer_id`,
            {
                customer_id: { dir: oracledb.BIND_IN, val: customerIdNum, type: oracledb.NUMBER }
            },
            {
                resultSet: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT
            });

        const rs = result.resultSet;
        const rows = await rs.getRows();
        await rs.close();
        return rows || null;
    } catch (err) {
        console.error('Error closing connection:', err.message);
        throw err;
    } finally {
        connection?.close().catch(err => { console.error('Error closing connection:', err.message); });
    }
}

async function createCustomer(customer_id, email_address, full_name) {
    let connection;
    try {
        connection = await pool.getConnection();
        const result = await connection.execute(`insert into customers (customer_id, email_address, full_name)
                                           values (:customer_id, :email_address, :full_name)`,
            [customer_id, email_address, full_name],
            { autoCommit: true }
        );
        return result;
    } catch (err) {
        console.error(err.message);
        throw err
    }
    finally {
        connection?.close().catch(err => { console.error('Error closing connection:', err.message); });
    };
}

async function updateCustomer(customer){
    let connection;
    try {
        const {customer_id, email_address, full_name} = customer;
        connection = await pool.getConnection();
        const result = await connection.execute(`update customers
                                set email_address = :email_address,
                                full_name = :full_name
                                where customer_id = :customer_id
                                `,
            { customer_id, email_address, full_name },
            { autoCommit: true });

        if (result.rowsAffected === 0) {
            throw new Error('Customer not found');
        }

        return result;
    }
    catch(err){
        console.error(err.message);
        throw err;
    }
    finally {
        connection?.close().catch(err => { console.error('Error closing connection:', err.message); });
    }
}

async function deleteCustomer(customer_id){
    let connection;
    try {
        connection = await pool.getConnection();
        const result = await connection.execute(`delete
                                from customers
                                where customer_id = :customer_id
                                `,
            { customer_id },
            { autoCommit: true });

        if (result.rowsAffected === 0) {
            throw new Error('Customer not found');
        }
        return result;
    }
    catch(err){
        console.error(err.message);
        throw err;
    }
    finally {
        connection?.close().catch(err => { console.error('Error closing connection:', err.message); });
    }
}


export default { getCustomerById, getCustomers, createCustomer, updateCustomer, deleteCustomer };