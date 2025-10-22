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
        const result = await connection.execute(`
                                                select customer_id as "customerId",
                                                    email_address as "emailAddress",
                                                    full_name as "fullName"
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

async function getCustomerById(customerId) {
    let connection;
    try {
        connection = await pool.getConnection();
        const customerIdNum = Number(customerId);
        const result = await connection.execute(`
                                            select customer_id as "customerId",
                                                email_address as "emailAddress",
                                                full_name as "fullName"
                                            from customers
                                            where customer_id = :customerId
                                            order by customer_id`,
            {
                customerId: { dir: oracledb.BIND_IN, val: customerIdNum, type: oracledb.NUMBER }
            },
            {
                //resultSet: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT
            });
        const rows = result.rows[0];
        return rows || null;
        //const rs = result.resultSet;
        //const rows = await rs.getRows();
        //await rs.close();
        //return rows || null;
    } catch (err) {
        console.error('Error closing connection:', err.message);
        throw err;
    } finally {
        connection?.close().catch(err => { console.error('Error closing connection:', err.message); });
    }
}

async function createCustomer(customerId, email_address, full_name) {
    let connection;
    try {
        connection = await pool.getConnection();
        const result = await connection.execute(`insert into customers (customer_id, email_address, full_name)
                                           values (:customerId, :email_address, :full_name)`,
            [customerId, email_address, full_name],
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

async function updateCustomer(customer) {
    let connection;
    try {
        const { customerId, email_address, full_name } = customer;
        connection = await pool.getConnection();
        const result = await connection.execute(`update customers
                                set email_address = :email_address,
                                full_name = :full_name
                                where customer_id = :customerId
                                `,
            { customerId, email_address, full_name },
            { autoCommit: true });

        if (result.rowsAffected === 0) {
            throw new Error('Customer not found');
        }

        return result;
    }
    catch (err) {
        console.error(err.message);
        throw err;
    }
    finally {
        connection?.close().catch(err => { console.error('Error closing connection:', err.message); });
    }
}

async function deleteCustomer(customerId) {
    let connection;
    try {
        connection = await pool.getConnection();
        const result = await connection.execute(`delete
                                from customers
                                where customer_id = :customerId
                                `,
            { customerId },
            { autoCommit: true });

        if (result.rowsAffected === 0) {
            throw new Error('Customer not found');
        }
        return result;
    }
    catch (err) {
        console.error(err.message);
        throw err;
    }
    finally {
        connection?.close().catch(err => { console.error('Error closing connection:', err.message); });
    }
}


async function createCustomers(customerList) {
    let connection;
    try{
        connection = await pool.getConnection();
        const sql = `insert into customers ( email_address, full_name)
                            values (:emailAddress, :fullName)`;
/*
        const binds = [
            { customerId: 500, emailAddress: "i@i.com", fullName: "Alan" },
            { customerId: 501, emailAddress: "j@j.com", fullName: "Brian" },
            { customerId: 502, emailAddress: "k@k.com", fullName: "Carol" }
        ];
*/
        const options = {
            autoCommit: true,
            bindDefs: {
                emailAddress: { type: oracledb.STRING, maxSize: 100 },
                fullName: { type: oracledb.STRING, maxSize: 100 }
            }
        };

        const result = await connection.executeMany(sql, customerList, options);

        console.log(result.rowsAffected); 
        return result;
    } catch (err) {
        console.error(err.message);
        throw err
    }
    finally {
        connection?.close().catch(err => { console.error('Error closing connection:', err.message); });
    };
        
}



export default { getCustomerById, getCustomers, createCustomer, updateCustomer, deleteCustomer, createCustomers };