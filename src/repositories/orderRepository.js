import pool from '#db/oraclePool.js';
import oracledb from 'oracledb';


async function getCustomerOrders(customerId, retrievalMethod) {
    let connection;
console.log('retrievalMethod=', retrievalMethod );
    try{
        connection = await pool.getConnection();
        if(retrievalMethod == 'R'){
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
            {customerId},
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );
        return result.implicitResults;
    }
    else{
        const plsql = `
                SELECT customer_id, email_address, full_name,
                            CURSOR(
                            select o.order_id, o.order_tms, o.order_status, o.store_id
                                from orders o
                                where o.customer_id = :customerId
                                order by o.order_id
                                ) as o
                FROM customers c
                where customer_id = :customerId;
            `;
            const result = await connection.execute(plsql,
            { customerId },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        return result.rows;
    }
    }
    catch(err){
        console.error('Error closing connection:', err.message);    
}
    finally {
        connection?.close().catch(err => { console.error('Error closing connection:', err.message) });
    }
}

export default { getCustomerOrders }