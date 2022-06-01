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

    projectedCostForCostOfLivingIncrease();
}

function projectedCostForCostOfLivingIncrease() {
    //Declaring variables for math purposes    
    let nextYearsMonthlyCost = 0;
    let nextYearsMaxMonthlyCost = 20000;
    let avgCostOfLivingIncrease = 0.03;
    //Looping through employee array to get annual salary and convert to monthly
    for(let employee of employeeObjectArray) {
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



module.exports = calculateMonthlyCost;