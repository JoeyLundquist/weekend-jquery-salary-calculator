$(readyNow);

function readyNow() {
    $(document).on('click', '#submitEmployeeInfoToTable', onSubmit);
    $(document).on('click', '.deleteEmployeeFromTable', onDelete);
    displayOnEmployeeTable();
    calculateMonthlyCost();
}
//baseline array for testing
const employeeObjectArray = [
    {
        firstName: "Medea",
        lastName: 'Aigle',
        idNumber: '123',
        jobTitle: 'Window Cleaner',
        annualSalary: '12000'
    },
    {
        firstName: "Althea",
        lastName: 'Pyrrhus',
        idNumber: '456',
        jobTitle: 'Sales Associate',
        annualSalary: '35000'
    },
    {
        firstName: "Brontes",
        lastName: 'Orestes',
        idNumber: '789',
        jobTitle: 'General Manager',
        annualSalary: '56000'
    },
    {
        firstName: "Anthea",
        lastName: 'Selena',
        idNumber: '1011',
        jobTitle: 'CFO',
        annualSalary: '85000'
    },
];

function addEmployeeToTable (firstName, lastName, id, jobTitle, annualSalary) {
    //gonna take in the employee information to add to an array of employee objects
    const newEmployeeObject = {
        firstName: firstName,
        lastName: lastName,
        idNumber: id,
        jobTitle: jobTitle,
        annualSalary: annualSalary
    }
    //Not let the object get pushed if missing information
    if(firstName == null || firstName === '' || lastName == null || lastName === '' || id == null || id === '' || 
    jobTitle == null || jobTitle === '' || annualSalary == null || annualSalary === '') {
        alert('Missing Fields')
        return false;
    }
    //Pushing new employeeObject to employeeObjectArray
    employeeObjectArray.push(newEmployeeObject);
    return employeeObjectArray;
}

function onSubmit () {
    //Setting getter values to variable
    let employeeFirstName = $('#employeeFirstName').val();
    let employeeLastName = $('#employeeLastName').val();
    let employeeIdNumber = $('#employeeIdNumber').val();
    let employeeJobTitle = $('#employeeJobTitle').val();
    let employeeAnnualSalary = $('#employeeAnnualSalary').val();

    //adding inputs to the addEmployeeToTable function
    addEmployeeToTable(employeeFirstName, employeeLastName, employeeIdNumber, employeeJobTitle, employeeAnnualSalary);

    //emptying fields after button push
    $('#employeeFirstName').val('');
    $('#employeeLastName').val('');
    $('#employeeIdNumber').val('');
    $('#employeeJobTitle').val('');
    $('#employeeAnnualSalary').val('');

    //Display employee info to DOM
    displayOnEmployeeTable();
    // Calculate monthly cost
    calculateMonthlyCost();

}


function displayOnEmployeeTable() {
    //setting variable for my .data() function
    let deleteButtonCounter = 1;
    let el = $('#employeeMonthlyCostTable');
    //Empty table before looping over array to re-insert employees.
    el.empty();
    
    // looping through employeeObjectArray to append to DOM
    for(let employee of employeeObjectArray){
        el.append(`
            <tr>
                <td>${deleteButtonCounter}</td>
                <td class="tableTextMargins">${employee.firstName}</td>
                <td class="tableTextMargins">${employee.lastName}</td>
                <td class="centerTextInTableColumns">${employee.idNumber}</td>
                <td class="tableTextMargins">${employee.jobTitle}</td>
                <td class="centerTextInTableColumns">$${employee.annualSalary}</td>
                <td class="centerTextInTableColumns">
                    <button class = "deleteEmployeeFromTable">Delete</button>
                </td>
            </tr>
            <div class="deleteCounter></div>"`);    
        deleteButtonCounter ++;
    }
}

function calculateMonthlyCost() {
    // creating variable for monthly cost
    let monthlyCost = 0;
    let maxMonthlyCost = 20000;
    
    // Loop through employeeObjectArray to grab annual Salaries
    for(let annualSalary of employeeObjectArray) {
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
        $('.monthlyCostOutput').css('backgroundColor', 'red')
    }
    else{
        $('.monthlyCostOutput').css('backgroundColor', 'green')
    }
}

function onDelete() {
    let deleteStartNumber = Number($(this).parent().siblings().first().text());
    employeeObjectArray.splice(deleteStartNumber-1, 1);
    displayOnEmployeeTable();
    calculateMonthlyCost();
    console.log(employeeObjectArray)
}
