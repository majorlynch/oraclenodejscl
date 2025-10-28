import oracledb from 'oracledb';
import pool from '#db/oraclePool.js';

async function getProductinventory(productId, storeId) {
    let connection, productInventory;
    console.log(productId);
    console.log(storeId);
    try {
        connection = await pool.getConnection();
        if (!storeId) {
    console.productInventory = await connection.execute(
                `BEGIN
                    :product_inventory := inventory_pkg.check_inventory(an_productId => :productId);
                END;`,
                {
                    product_inventory: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
                    productId
                });
        }
        else
        {
    console.log('B');
            productInventory = await connection.execute(
                `BEGIN
                    :product_inventory := inventory_pkg.check_inventory(:productId, :storeId);
                END;`,
                {
                    product_inventory: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
                    productId,
                    storeId
                });
        }
        return productInventory.outBinds;
    }
    catch (err) {
        console.error('Error closing connection:', err.message);
        throw err;
    }
    finally {
        connection?.close().catch(err => { console.error('Error closing connection:', err.message) });
    }
}

export default { getProductinventory }