const express = require('express');
 
const app = express();

const employeeRouter = require('./routes/employee.router');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))

const PORT = process.env.PORT || 5000;

app.use(express.static('server/public'));

app.use('/employees', employeeRouter);


app.listen(PORT, () => {
    console.log('Listening on port', PORT)
});