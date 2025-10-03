const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
const cors = require('cors');
const config = require('./dbconfig');
const app = express();

const connectionProperties =
{
    user: config.user,
    password: config.password,
    connectString: config.connectString,
    configDir: config.walletLocation,
    walletLocation: config.walletLocation,
    walletPassword: config.password
};

function doRelease(connection) {
    connection.release(function (err) {
        if (err) {
            console.error(err.message);
        }
    });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors({ origin: '*', credentials: true }));


const PORT = process.env.PORT || 8080;

const router = express.Router();

router.use(function (req, res, next) {
    console.log("REQUEST:" + req.method + "   " + req.url);
    console.log("BODY:" + JSON.stringify(req.body));
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

router.route('/customers/:customerId/:fullname').get(async function (req, res) {
    console.log('get customers');
    let customerId = req.params.customerId;
    let fullName = req.params.fullname;
    
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
            return;
        }
        console.log("After connection");
        connection.execute(`select customer_id, email_address, full_name
                                       from customers
                                       where customer_id = :customerId or full_name like :fullName
                                       order by customer_id`,
            { customerId,
            fullName: `%${fullName}%`
        },
            { outFormat: oracledb.OUT_FORMAT_OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    res.status(500).send(err.message);
                    doRelease(connection);
                    return;
                }
                let customers = [];
                result.rows.forEach(function (element) {
                    // console.log("ROWS:" + JSON.stringify(element));
                    customers.push({ customer_id: element.CUSTOMER_ID, email_address: element.EMAIL_ADDRESS, full_name: element.FULL_NAME });
                });
                console.log(customers);
                res.json(customers);
                doRelease(connection);
            });
    });

});
app.use('/', router);
app.listen(PORT);