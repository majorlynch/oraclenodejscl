// db/oracle.js
import oracledb from 'oracledb';
import config from('../config/dbconfig.js');

const connectionProperties = {
  user: config.user,
  password: config.password,
  connectString: config.connectString,
  configDir: config.walletLocation,
  walletLocation: config.walletLocation,
  walletPassword: config.password
};
let pool;
async function createConnection()
{
 pool = await oracledb.createPool(connectionProperties);
}

async function getConnection() {
  //return oracledb.getConnection(connectionProperties);
  return pool.getConnection();
}

function releaseConnection(connection) {
  connection.release(err => {
    if (err) console.error(err.message);
  });
}

export { createConnection, getConnection, releaseConnection };