import pool from '../db/oraclePool.js';

async function getCustomerOrders(customerId) {
    let connection;
    try{
        connection = await pool.getConnection();
        const plsql = `
        DECLARE
            c1 SYS_REFCURSOR;
            c2 SYS_REFCURSOR;
        BEGIN
            OPEN c1 FOR
                select customer_id, email_address, full_name
                from customers
                where customer_id = :customerId;
            DBMS_SQL.RETURN_RESULT(c1);

            OPEN C2 FOR
                select o.order_id, o.order_tms, o.order_status, o.store_id
                from orders o
                where o.customer_id = :customerId
                order by o.order_id;
            DBMS_SQL.RETURN_RESULT(c2);
        END;
            `;
        const result = await connection.execute(plsql,
        {customerId}
    );
    
    return result.implicitResults;
    }
    catch(err){
        console.error('Error closing connection:', err.message);    
}
    finally {
        connection?.close().catch(err => { console.error('Error closing connection:', err.message) });
    }
}

export default { getCustomerOrders }