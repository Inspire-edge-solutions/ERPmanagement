import mysql from 'mysql2/promise';

async function getDBConnection(secret) {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: secret.username,
        password: secret.password,
        database: process.env.DB_NAME,
        connectTimeout: 5000,
    });
}

export { getDBConnection };