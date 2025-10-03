const oracledb = require('oracledb');
const config = require('./dbconfig');

// If THICK mode is needed, uncomment the following line.
// oracledb.initOracleClient();

// If you want to connect using your wallet, uncomment the following line.
process.env.TNS_ADMIN = config.walletLocation;

async function runApp()
{
	console.log("executing runApp");
	// Replace USER_NAME, PASSWORD with your username and password
	const user = config.user;
	const password = config.password;
	// If you want to connect using your wallet, comment the following line.
	//const connectString = config.connectString;
	/*
	* If you want to connect using your wallet, uncomment the following line.
	* dbname - is the TNS alias present in tnsnames.ora dbname
	*/
	const connectString = config.connectString;
	let connection;
	try {
		connection = await oracledb.getConnection({
			user,
			password,
			connectString,
			// If you want to connect using your wallet, uncomment the following lines.
			configDir: config.walletLocation,
			walletLocation: config.walletLocation,
			walletPassword: config.password
		});
		console.log("Successfully connected to Oracle Databas");
		const result = await connection.execute("select min(full_name) as full_name from customers");
		console.log("Query rows", result.rows);
	} catch (err) {
		console.error(err);
	} finally {
		 if (connection){
			try {
				await connection.close();
			} catch (err) {
				console.error(err);
			}
		}
	}
}

runApp();