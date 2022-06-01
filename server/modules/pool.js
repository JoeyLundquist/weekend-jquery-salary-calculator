const pg = require('pg');

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'employee_salary_calculator'
});

module.exports = pool;