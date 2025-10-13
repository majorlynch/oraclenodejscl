// ESM version
import oracledb from 'oracledb';
import dbconfig from '../config/dbconfig.js';

const connectionProperties = {
  user: dbconfig.user,
  password: dbconfig.password,
  connectString: dbconfig.connectString,
  configDir: dbconfig.walletLocation,
  walletLocation: dbconfig.walletLocation,
  walletPassword: dbconfig.password
};

const pool = await oracledb.createPool(connectionProperties);

export default pool;