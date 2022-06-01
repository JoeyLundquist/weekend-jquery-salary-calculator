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


employeeRouter.post('/', (req, res) => {
    console.log('In POST')
    let employee = req.body
    console.log(employee)

    const sqlQuery = `
    INSERT INTO "employees"
    ("firstName", "lastName", "employeeId", "jobTitle", "annualSalary")
    VALUES
    ($1, $2, $3, $4, $5);
    `

    const sqlParams = [
        employee.firstName,
        employee.lastName,
        Number(employee.employeeId),
        employee.jobTitle,
        Number(employee.annualSalary)
    ]
    console.log(sqlParams)


    pool.query(sqlQuery, sqlParams)
        .then((dbRes) => {
            console.log('POST success')
            res.sendStatus(201)
        })
        .catch((err) => {
            console.log('POST FAILED')
            res.sendStatus(500);
        })

})

employeeRouter.delete('/', (req, res) => {
    const employee = req.body;

    const sqlQuery = `
        DELETE FROM employees
        WHERE id = $1;
    `

    const sqlParams = [
        Number(employee.employeeId)
    ]

    pool.query(sqlQuery, sqlParams)
        .then((dbRes) => {
            console.log('DELETE success')
            res.sendStatus(201)
        })
        .catch((err) => {
            console.log('DELETE failed', err)
            res.sendStatus(500)
        })

})


module.exports = employeeRouter;