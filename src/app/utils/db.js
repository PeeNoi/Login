import mysql from 'mysql2/promise';
import url from 'url';

const { hostname, port, pathname, auth, query } = url.parse(process.env.MYSQL_URI, true);
const [user, password] = auth.split(':');

// Create the MySQL connection pool with parsed parameters
export const mysqlPool = mysql.createPool({
    host: hostname,
    port: parseInt(port),
    user: user,
    password: password,
    database: pathname.substring(1), // Removes the leading '/'
    ssl: {
        rejectUnauthorized: JSON.parse(query.ssl).rejectUnauthorized
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
