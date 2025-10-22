'use strict';


import oracledb from 'oracledb';
import assert from 'assert';
import pool from '#db/oraclePool.js';
import { expect } from 'chai';



describe('Customer query integration test', function() {

    let connection;

    before('select statements', async function() {
      console.log('before test');
      connection = await pool.getConnection();
    });

    beforeEach('select statements', async function() {
      console.log('before each test');
    });

    it('1.1. select statement', async function() {
        const result = await connection.execute(`
                                                select customer_id as "customerId",
                                                    email_address as "emailAddress",
                                                    full_name as "fullName" 
                                                from customers
                                                where customer_id = :id`,
        [1],
        { outFormat: oracledb.OUT_FORMAT_OBJECT });
        assert.strictEqual(result.rows[0].customerId, 1);
        assert.strictEqual(result.rows[0].fullName, "Tammy Bryant");
        expect(result.rows[0]).to.have.property('fullName').that.equals('Tammy Bryant');
        expect(result.rows).to.have.lengthOf(1);
        expect(result.rows[0]).to.deep.include({
        customerId: 1,
        emailAddress: 'tammy.bryant@internalmail',
        fullName: 'Tammy Bryant'
        });
    });

    afterEach('select statements', async function() {
        console.log('after each test');
    });

    after('select statements', async function() {
        console.log('after test');
        connection?.close().catch(err => { console.error('Error closing connection:', err.message); });
    });

});
