$(readyNow);

function readyNow() {
    $(document).on('click', '#submitEmployeeInfoToTable', onSubmit);
    $(document).on('click', '#deleteEmployeeFromTable', onDelete);
}

const employeeObjectArray = [];

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
    jobTitle == null || jobTitle === '' || annualSalary == null || annualSalary === '' ||) {
        return false;
    }

    employeeObjectArray.push(newEmployeeObject);
    return employeeObjectArray;
}

