const express = require('express');

const pool = require('../modules/pool');

const employeeRouter = express.Router();


employeeRouter.get('/', (req, res) => {
    console.log('In GET request');

    const sqlQuery = `
        SELECT * FROM employees
        ORDER BY "jobTitle" ASC;
    `

    pool.query(sqlQuery)
        .then((dbRes) => {
            res.send(dbRes.rows)
        })
        .catch((err) => {
            console.log('failed to GET')
            res.sendStatus(500)
        })
})



module.exports = employeeRouter;