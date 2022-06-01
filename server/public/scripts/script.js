$(readyNow);

function readyNow() {
    $(document).on('click', '#submitEmployeeInfoToTable', onSubmit);
    $(document).on('click', '.deleteEmployeeFromTable', onDelete);
    // calculateMonthlyCost();
    getEmployees();
}
//baseline array for testing
// const employeeObjectArray = [
//     {
//         firstName: "Medea",
//         lastName: 'Aigle',
//         idNumber: '123',
//         jobTitle: 'Window Cleaner',
//         annualSalary: '12000'
//     },
//     {
//         firstName: "Althea",
//         lastName: 'Pyrrhus',
//         idNumber: '456',
//         jobTitle: 'Sales Associate',
//         annualSalary: '35000'
//     },
//     {
//         firstName: "Brontes",
//         lastName: 'Orestes',
//         idNumber: '789',
//         jobTitle: 'General Manager',
//         annualSalary: '56000'
//     },
//     {
//         firstName: "Anthea",
//         lastName: 'Selena',
//         idNumber: '1011',
//         jobTitle: 'CFO',
//         annualSalary: '85000'
//     },
// ];

// function addEmployeeToTable (firstName, lastName, id, jobTitle, annualSalary) {
//     //gonna take in the employee information to add to an array of employee objects
//     const newEmployeeObject = {
//         firstName: firstName,
//         lastName: lastName,
//         idNumber: id,
//         jobTitle: jobTitle,
//         annualSalary: annualSalary
//     }
//     //Not let the object get pushed if missing information
//     if(firstName == null || firstName === '' || lastName == null || lastName === '' || id == null || id === '' || 
//     jobTitle == null || jobTitle === '' || annualSalary == null || annualSalary === '') {
//         alert('Missing Fields')
//         return false;
//     }
//     //Pushing new employeeObject to employeeObjectArray
//     // employeeObjectArray.push(newEmployeeObject);
//     // return employeeObjectArray;
    

// }


console.log('To stop the comment from being sucked up')
//GET REQUEST
function getEmployees() {


    $.ajax({
        url: 'employees',
        method: 'GET'
    })
    .then((response) => {
        console.log('GET success')
        displayOnEmployeeTable(response)
    })
    .catch((err) => {
        console.log('GET failed', err)
    })
}

function onSubmit () {
    //Setting getter values to variable
    let  employeeToSend = {
        firstName: $('#employeeFirstName').val(),
        lastName: $('#employeeLastName').val(),
        employeeId: $('#employeeIdNumber').val(),
        jobTitle: $('#employeeJobTitle').val(),
        annualSalary: $('#employeeAnnualSalary').val()
    }
    //adding inputs to the addEmployeeToTable function
    // addEmployeeToTable(employeeFirstName, employeeLastName, employeeIdNumber, employeeJobTitle, employeeAnnualSalary);


    $.ajax({
        url:'employees', 
        method: 'POST',
        data: employeeToSend
    })
    .then((response) => {
        getEmployees();
    })
    .catch((err) => {
        console.log('POST failed', err)
    })

    //emptying fields after button push
    $('#employeeFirstName').val('');
    $('#employeeLastName').val('');
    $('#employeeIdNumber').val('');
    $('#employeeJobTitle').val('');
    $('#employeeAnnualSalary').val('');

    //Display employee info to DOM
    // displayOnEmployeeTable();
    // Calculate monthly cost
    // calculateMonthlyCost();

}


function displayOnEmployeeTable(array) {
    //setting variable for my .data() function
    let rowCounter = 1;
    let el = $('#employeeMonthlyCostTable');
    //Empty table before looping over array to re-insert employees.
    el.empty();
    
    // looping through employeeObjectArray to append to DOM
    for(let employee of array){
        el.append(`
            <tr>
                <td class="rowCounter">${rowCounter}.</td>
                <td class="tableTextMargins alertName">${employee.firstName}</td>
                <td class="tableTextMargins alertName">${employee.lastName}</td>
                <td id="rowId" class="centerTextInTableColumns" data-employee-id="${employee.employeeId}">${employee.employeeId}</td>
                <td class="tableTextMargins">${employee.jobTitle}</td>
                <td class="centerTextInTableColumns">$${employee.annualSalary}</td>
                <td class="centerTextInTableColumns">
                    <button class = "deleteEmployeeFromTable">Delete</button>
                </td>
            </tr>
            <div class="deleteCounter></div>"`);    
        rowCounter ++;
    }
    calculateMonthlyCost(array);
}

function calculateMonthlyCost(array) {
    // creating variable for monthly cost
    let monthlyCost = 0;
    let maxMonthlyCost = 20000;
    
    // Loop through employeeObjectArray to grab annual Salaries
    for(let annualSalary of array) {
        // creating a variable for my to calc monthly cost
        let annualToMonthly = annualSalary.annualSalary / 12;
        monthlyCost += annualToMonthly;
    }
    let monthlyCostOutput = $('#employeeMonthlyCostOutput');
    //Empty monthlyCostOutPut on DOM
    monthlyCostOutput.empty();
    //append monthly cost to dom
    monthlyCostOutput.append(monthlyCost.toFixed(2));
    //Changing the backgroundColor from green to red if we go over budget
    if(monthlyCost > maxMonthlyCost){
        $('#monthlyCostBox').css('backgroundColor', 'red')
    }
    else{
        $('#monthlyCostBox').css('backgroundColor', 'green')
    }

    let remainingBudget = maxMonthlyCost - monthlyCost;
    let remainingBudgetOutput = $('#reamingMonthlyBudgetOutput');
    remainingBudgetOutput.empty();
    remainingBudgetOutput.append(remainingBudget.toFixed(2));
    if(remainingBudget < 0){
        $('#remainingBudgetBox').css('backgroundColor', 'red')
    }
    else {
        $('#remainingBudgetBox').css('backgroundColor', 'green')
    }

    projectedCostForCostOfLivingIncrease(array);
}

function onDelete() {
    //alert($(this).parent().parent().children('.alertName').text() + ' is being removed');
    
const employeeIdNumber = $(this).parent().parent().children('#rowId').data('employee-id');
let matchingEmployee;

    //This is how you can find the ID number of an employee
    console.log($(this).parent().parent().children('#rowId').data('employee-id'));
    //loop through array of Employees to match the id then retrieve the index number for .splice function
    for(let employee of employeeObjectArray){
        if(Number(employeeIdNumber) === employee.idNumber){
            matchingEmployee = employee;
            console.log(matchingEmployee);
            employeeObjectArray.splice(employee.index(), 1);
        }
    }

    console.log()
    
    
    displayOnEmployeeTable();
    calculateMonthlyCost();
    console.log(employeeObjectArray)
}

function projectedCostForCostOfLivingIncrease(array) {
    //Declaring variables for math purposes    
    let nextYearsMonthlyCost = 0;
    let nextYearsMaxMonthlyCost = 20000;
    let avgCostOfLivingIncrease = 0.03;
    //Looping through employee array to get annual salary and convert to monthly
    for(let employee of array) {
        let annualToMonthly = employee.annualSalary / 12;
        nextYearsMonthlyCost += annualToMonthly;
    }
    //declaring my output variable
    let nextYearsProjectedCostOutput = $('#projectedCostOfLivingIncreaseOutput');
    //
    let nextYearsCostIncrease = nextYearsMonthlyCost * avgCostOfLivingIncrease;
    console.log(nextYearsCostIncrease)
    //Setting variable to add cost increase with monthly cost
    let nextYearsCostWithIncrease = nextYearsCostIncrease + nextYearsMonthlyCost;
    nextYearsProjectedCostOutput.empty();
    nextYearsProjectedCostOutput.append(nextYearsCostWithIncrease.toFixed(2));
    if(nextYearsCostWithIncrease > nextYearsMaxMonthlyCost){
        $('#costOfLivingIncreaseBox').css('backgroundColor', 'red')
    }
    else {
        $('#costOfLivingIncreaseBox').css('background', 'green')
    }
}
