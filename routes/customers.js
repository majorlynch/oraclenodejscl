// routes/customers.js
const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const { connectionProperties, getConnection, releaseConnection } = require('../db/oracle');

router.use(function (req, res, next) {
    console.log("REQUEST:" + req.method + "   " + req.url);
    console.log("BODY:" + JSON.stringify(req.body));
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    //     res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/**
 * @swagger
 * /customers/:
 *   get:
 *     summary: Get all customers
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   customer_id:
 *                     type: integer
 *                   email_address:
 *                     type: string
 *                   full_name:
 *                     type: string
 */

router.route('/customers/').get(async (req, res) => {
    console.log('get all customers');

    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(`select customer_id, email_address, full_name
                                                 from customers
                                                 order by customer_id`,
                                                 {},
              {
    resultSet: true,             // Enable streaming
    outFormat: oracledb.OUT_FORMAT_OBJECT
  }
);

        const rs = result.resultSet;
        const rows = [];

        let row;
        while ((row = await rs.getRow())) {
            rows.push(row);
        }

        await rs.close();  
        res.status(200).json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
    finally {
        if (connection) {
            try {
                doRelease(connection);
            } catch (closeErr) {
                console.error('Error closing connection:', closeErr.message);
            }
        }
    };
});

/**
 * @swagger
 * /customers/{customer_id}:
 *   get:
 *     summary: Get customer by ID or name
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   customer_id:
 *                     type: integer
 *                   email_address:
 *                     type: string
 *                   full_name:
 *                     type: string
 */

router.route('/customers/:customer_id').get(async (req, res) => {
    console.log('get customers');
    const { customer_id } = req.params;

    console.log(customer_id );

    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(`select customer_id, email_address, full_name
                                                 from customers
                                                 where customer_id = :customer_id
                                                 order by customer_id`,
            { customer_id },
            { outFormat: oracledb.OUT_FORMAT_OBJECT });

        let customers = [];
        result.rows.map(function (element) {
            customers.push({ customer_id: element.CUSTOMER_ID, email_address: element.EMAIL_ADDRESS, full_name: element.FULL_NAME });
        });
        res.status(200).json(customers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
    finally {
        if (connection) {
            try {
                doRelease(connection);
            } catch (closeErr) {
                console.error('Error closing connection:', closeErr.message);
            }
        }
    };
});

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - email_address
 *               - full_name
 *             properties:
 *               customer_id:
 *                 type: integer
 *               email_address:
 *                 type: string
 *               full_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 customer_id:
 *                   type: integer
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route('/customers/').post(async (req, res) => {
    console.log('POST customer');
    let connection;

    try {
        const { customer_id, email_address, full_name } = req.body;
        connection = await getConnection();
        const result = connection.execute(`insert into customers (customer_id, email_address, full_name)
                                values (:customer_id, :email_address, :full_name)`,
            [customer_id, email_address, full_name],
            { autoCommit: true }
        );
        res.status(201).json({
            message: 'Customer created',
            customer_id,
            email_address, 
            full_name,
            result
    });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
    finally {
        if (connection) {
            try {
                doRelease(connection);
            } catch (closeErr) {
                console.error('Error closing connection:', closeErr.message);
            }
        }
    };
});

/**
 * @swagger
 * /customers:
 *   put:
 *     summary: Update a customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - email_address
 *               - full_name
 *             properties:
 *               customer_id:
 *                 type: integer
 *               email_address:
 *                 type: string
 *               full_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 customer_id:
 *                   type: integer
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route('/customers/').put(async (req, res) => {
    console.log('PUT customer');
    const { customer_id, email_address, full_name } = req.body;
    let connection;
    try {
        connection = await getConnection();
        result = await connection.execute(`update customers
                                set email_address = :email_address,
                                full_name = :full_name
                                where customer_id = :customer_id
                                `,
            {customer_id, email_address, full_name},
            { autoCommit: true });

        if (result.rowsAffected === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({
            message: 'Customer updated',
            customer_id,
            email_address,
            full_name,
            rowsUpdates: result });
        doRelease(connection);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
    finally {
        if (connection) {
            try {
                doRelease(connection);
            } catch (closeErr) {
                console.error('Error closing connection:', closeErr.message);
            }
        }
    };
});

/**
 * @swagger
 * /customers/{customer_id}:
 *   delete:
 *     summary: Delete a customer
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 customer_id:
 *                   type: integer
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route('/customers/:customer_id').delete(async (req, res) => {
    console.log('DELETE customer');
    const { customer_id } = req.params;
    let connection;

    try {
        connection = await getConnection();
        const result = await connection.execute(`
                                delete
                                from customers
                                where customer_id = :customer_id
                                `,
                                {customer_id},
                                { autoCommit: true });

        if (result.rowsAffected === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted', customer_id });
    }
    catch (err) {
        console.error('Error deleting customer:', err.message);
        res.status(500).send(err.message);
    }
    finally {
        if (connection) {
            try {
                doRelease(connection);
            } catch (closeErr) {
                console.error('Error closing connection:', closeErr.message);
            }
        }
    };
});

function doRelease(connection) {
    connection.release(function (err) {
        if (err) {
            console.error(err.message);
        }
    });
}

module.exports = router;
