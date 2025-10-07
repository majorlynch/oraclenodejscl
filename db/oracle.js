// db/oracle.js
const oracledb = require('oracledb');
const config = require('../config/dbconfig');

const connectionProperties = {
  user: config.user,
  password: config.password,
  connectString: config.connectString,
  configDir: config.walletLocation,
  walletLocation: config.walletLocation,
  walletPassword: config.password
};

async function getConnection() {
  return oracledb.getConnection(connectionProperties);
}

function releaseConnection(connection) {
  connection.release(err => {
    if (err) console.error(err.message);
  });
}

module.exports = { connectionProperties, getConnection, releaseConnection };