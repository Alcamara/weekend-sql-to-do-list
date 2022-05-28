const pg = require('pg');
const Pool = pg.Pool;

const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port:5432,
    max:10,
    idleTimeoutMillis: 30000
}

const pool = new pg.Pool(config);

pool.on('connect',()=>{
    console.log('Connected to postgres');
});

pool.on('error',()=>{
    console.log('Error connecting to postgres');
})


module.exports = pool;