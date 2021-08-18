let calculateOnInput = false;

function calculate(ele, inp, isPer = false, isNum = false) {
  let slectPrice = ele.parentNode.parentNode.children[0].children[1];
  ele.style.background = `linear-gradient(to right, #333333 0%, #333333 ${
    ((ele.value - ele.min) / (ele.max - ele.min)) * 100
  }%, #DEE2E6 ${((ele.value - ele.min) / (ele.max - ele.min)) * 100}%, #DEE2E6 100%)`;
  document.getElementById(inp).value = addCommas(ele.value);
  document.getElementById(inp).focus();
  if (calculateOnInput) calculateResult();
}
function changeSliderOnInputChange(inp, sliderId) {
  let val = inp.value.replace(/,/g, "") * 1;
  let slider = document.getElementById(sliderId);

  slider.style.background = `linear-gradient(to right, #333333 0%, #333333 ${
    ((val - slider.min) / (slider.max - slider.min)) * 100
  }%, #DEE2E6 ${((val - slider.min) / (slider.max - slider.min)) * 100}%, #DEE2E6 100%)`;
  slider.value = val;
  inp.value = addCommas(val);
  if (calculateOnInput) calculateResult();
}

function calculateResult() {
  enableSliders();
  // 1. Calculation assumption inputs
  let rentalIncome = document.getElementById("rentalIncome").value.replace(/,/g, "") * 1;
  let vocancyAllowance =
    (document.getElementById("vocancyAllowance").value.replace(/,/g, "") * 1) / 100;
  let maintenanceReservance =
    (document.getElementById("maintenanceReservance").value.replace(/,/g, "") * 1) / 100;
  let managementFee = (document.getElementById("managementFee").value.replace(/,/g, "") * 1) / 100;
  let propertyTaxes = document.getElementById("propertyTaxes").value.replace(/,/g, "") * 1;
  let insurance = document.getElementById("insurance").value.replace(/,/g, "") * 1;
  let utilities = document.getElementById("utilities").value.replace(/,/g, "") * 1;
  let miscExpenses = document.getElementById("miscExpenses").value.replace(/,/g, "") * 1;
  let rentalIncomeIncrease =
    (document.getElementById("rentalIncomeIncrease").value.replace(/,/g, "") * 1) / 100;
  let propertyTaxIncrease =
    (document.getElementById("propertyTaxIncrease").value.replace(/,/g, "") * 1) / 100;
  let utilityIncrease =
    (document.getElementById("utilityIncrease").value.replace(/,/g, "") * 1) / 100;
  let miscExpenseIncrease =
    (document.getElementById("miscExpenseIncrease").value.replace(/,/g, "") * 1) / 100;
  let buildingtolandvalueratio =
    (document.getElementById("buildingtolandvalueratio").value.replace(/,/g, "") * 1) / 100;
  let applicationRate =
    (document.getElementById("applicationRate").value.replace(/,/g, "") * 1) / 100;
  let closingCostBuy =
    (document.getElementById("closingCostBuy").value.replace(/,/g, "") * 1) / 100;
  let closingCostSell =
    (document.getElementById("closingCostSell").value.replace(/,/g, "") * 1) / 100;
  // 2. Basic Purchase Information
  let propertyValueest = document.getElementById("propertyValueest").value.replace(/,/g, "") * 1;
  let purchaseprice = document.getElementById("purchaseprice").value.replace(/,/g, "") * 1;
  // 3. Mortgage Calculations
  let interestRate = (document.getElementById("interestRate").value.replace(/,/g, "") * 1) / 100;
  let downPayment2 = (document.getElementById("downPayment2").value.replace(/,/g, "") * 1) / 100;
  let loanTerm = document.getElementById("loanTerm").value.replace(/,/g, "") * 1;
  let financialPerformanceSummary = new Array(3);
  // Basic Purchase Calculations
  let basicPurchaseInfoArray = new Array(2);
  basicPurchaseInfoArray[0] = downPayment2 * purchaseprice;
  basicPurchaseInfoArray[1] = basicPurchaseInfoArray[0] + (propertyValueest - purchaseprice);
  // Perform Morgage Calculations
  let morgageCalculationArray = new Array(3);
  morgageCalculationArray[0] = (1 - downPayment2) * purchaseprice;
  morgageCalculationArray[2] = PMTDiff(
    interestRate / 12,
    12 * loanTerm,
    morgageCalculationArray[0]
  );
  morgageCalculationArray[1] = 12 * morgageCalculationArray[2];
  // Perform Cash to purchase Calculations
  let cashToPurchaseArray = new Array(3);
  cashToPurchaseArray[0] = downPayment2 * purchaseprice;
  cashToPurchaseArray[1] = closingCostBuy * morgageCalculationArray[0];
  cashToPurchaseArray[2] = cashToPurchaseArray[0] + cashToPurchaseArray[1];
  console.log(morgageCalculationArray);
  updateFinancialAnalysisTable(
    morgageCalculationArray,
    cashToPurchaseArray,
    financialPerformanceSummary,
    basicPurchaseInfoArray
  );
}

function updateFinancialAnalysisTable(
  morgageCalculationArray,
  cashToPurchaseArray,
  financialPerformanceSummary,
  basicPurchaseInfoArray
) {
  // 1. Calculation assumption inputs
  let f11 = document.getElementById("rentalIncome").value.replace(/,/g, "") * 1;
  let f12 = (document.getElementById("vocancyAllowance").value.replace(/,/g, "") * 1) / 100;
  let f13 = (document.getElementById("maintenanceReservance").value.replace(/,/g, "") * 1) / 100;
  let f14 = (document.getElementById("managementFee").value.replace(/,/g, "") * 1) / 100;
  let f15 = document.getElementById("propertyTaxes").value.replace(/,/g, "") * 1;
  let f16 = document.getElementById("insurance").value.replace(/,/g, "") * 1;
  let f17 = document.getElementById("utilities").value.replace(/,/g, "") * 1;
  let f26 = document.getElementById("miscExpenses").value.replace(/,/g, "") * 1;
  let f37 = (document.getElementById("rentalIncomeIncrease").value.replace(/,/g, "") * 1) / 100;
  let f38 = (document.getElementById("propertyTaxIncrease").value.replace(/,/g, "") * 1) / 100;
  let f39 = (document.getElementById("utilityIncrease").value.replace(/,/g, "") * 1) / 100;
  let f40 = (document.getElementById("miscExpenseIncrease").value.replace(/,/g, "") * 1) / 100;
  let f41 = (document.getElementById("buildingtolandvalueratio").value.replace(/,/g, "") * 1) / 100;
  let f42 = (document.getElementById("applicationRate").value.replace(/,/g, "") * 1) / 100;
  let f43 = (document.getElementById("closingCostBuy").value.replace(/,/g, "") * 1) / 100;
  let f44 = (document.getElementById("closingCostSell").value.replace(/,/g, "") * 1) / 100;
  let year = [
    12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168, 180, 192, 204, 216, 228, 240, 252,
    264, 276, 288, 300, 312, 324, 336, 348, 360,
  ];
  let grossScheduleIncomeEles = document.querySelectorAll("#grossScheduleIncome");
  grossScheduleIncomeEles.forEach((el) => console.log(el));
  let yearNo = year.length;
  let grossScheduleIncome = new Array(yearNo);
  let lessVacancyAllowance = new Array(yearNo);
  let totalOperatingIncome = new Array(yearNo);
  let propertyTaxes = new Array(yearNo);
  let insurance = new Array(yearNo);
  let utilities = new Array(yearNo);
  let miscExpenses = new Array(yearNo);
  let MaintenanceReserve = new Array(yearNo);
  let propertyManagement = new Array(yearNo);
  let totalOperatingExpenses = new Array(yearNo);
  let netOperatingIncome = new Array(yearNo);
  let lessMortgageExpenses = new Array(yearNo);
  let annualCashFlow = new Array(yearNo);
  let monthlyCashFlow = new Array(yearNo);
  grossScheduleIncome[0] = 12 * f11;
  for (let x = 1; x < yearNo; x++) {
    grossScheduleIncome[x] = grossScheduleIncome[0] * Math.pow(1 + f37, (year[x] - 12) / 12);
  }
  for (let x = 0; x < yearNo; x++) {
    lessVacancyAllowance[x] = f12 * grossScheduleIncome[x];
  }
  for (let x = 0; x < yearNo; x++) {
    totalOperatingIncome[x] = grossScheduleIncome[x] - lessVacancyAllowance[x];
  }
  propertyTaxes[0] = 12 * f15;
  for (let x = 1; x < yearNo; x++) {
    propertyTaxes[x] = propertyTaxes[0] * Math.pow(1 + f38, (year[x] - 12) / 12);
  }
  for (let x = 0; x < yearNo; x++) {
    insurance[x] = 12 * f16;
  }
  utilities[0] = 12 * f17;
  for (let x = 1; x < yearNo; x++) {
    utilities[x] = utilities[0] * Math.pow(1 + f39, (year[x] - 12) / 12);
  }
  miscExpenses[0] = 12 * f26;
  for (let x = 1; x < yearNo; x++) {
    miscExpenses[x] = miscExpenses[0] * Math.pow(1 + f40, (year[x] - 12) / 12);
  }
  for (let x = 0; x < yearNo; x++) {
    MaintenanceReserve[x] = f13 * grossScheduleIncome[x];
  }
  for (let x = 0; x < yearNo; x++) {
    propertyManagement[x] = f14 * grossScheduleIncome[x];
  }
  for (let x = 0; x < yearNo; x++) {
    totalOperatingExpenses[x] =
      propertyTaxes[x] +
      insurance[x] +
      utilities[x] +
      miscExpenses[x] +
      MaintenanceReserve[x] +
      propertyManagement[x];
  }
  for (let x = 0; x < yearNo; x++) {
    netOperatingIncome[x] = totalOperatingIncome[x] - totalOperatingExpenses[x];
  }
  for (let x = 0; x < yearNo; x++) {
    lessMortgageExpenses[x] = morgageCalculationArray[1];
  }
  for (let x = 0; x < yearNo; x++) {
    annualCashFlow[x] = netOperatingIncome[x] - lessMortgageExpenses[x];
  }
  for (let x = 0; x < yearNo; x++) {
    monthlyCashFlow[x] = annualCashFlow[x] / 12;
  }
  // TAX BENEFITS
  let propertyValueest = document.getElementById("propertyValueest").value.replace(/,/g, "") * 1;
  let depreciation = new Array(8);
  for (let x = 0; x < yearNo; x++) {
    depreciation[x] = (propertyValueest * f41) / 27.5;
  }
  let mortgageInterest = new Array(8);
  let interestRate = (document.getElementById("interestRate").value.replace(/,/g, "") * 1) / 100;
  let loanTerm = document.getElementById("loanTerm").value.replace(/,/g, "") * 1;

  for (let x = 0; x < yearNo; x++) {
    mortgageInterest[x] = -COMITPMT(
      interestRate / 12,
      12 * loanTerm,
      morgageCalculationArray[0],
      year[x] - 11,
      year[x],
      0
    );
  }
  // EQUITY ACCUMULATION
  let propertyValue = new Array(8);
  let lessMortgageBalance = new Array(8);
  let equityWealth = new Array(8);

  for (let x = 0; x < yearNo; x++) {
    propertyValue[x] = propertyValueest * Math.pow(1 + f42, year[x] / 12);
  }
  for (let x = 0; x < yearNo; x++) {
    lessMortgageBalance[x] = FV(
      interestRate / 12,
      year[x],
      morgageCalculationArray[2],
      -morgageCalculationArray[0]
    );
  }
  for (let x = 0; x < yearNo; x++) {
    equityWealth[x] = propertyValue[x] - lessMortgageBalance[x];
  }
  // FINANCIAL PERFORMANCE
  let capitalizationRate = new Array(8);
  let cashOnCashReturn = new Array(8);
  let returnOnEquity = new Array(8);
  let annualizaedReturnOfReturn = new Array(8);
  let internalRateOfReturn = new Array(8);
  let returnOnInvestment = new Array(8);

  for (let x = 0; x < yearNo; x++) {
    capitalizationRate[x] = netOperatingIncome[x] / propertyValue[x];
  }

  for (let x = 0; x < yearNo; x++) {
    cashOnCashReturn[x] = annualCashFlow[x] / cashToPurchaseArray[2];
  }
  let plusPrincipalPayDown = new Array(8);
  let plusYearlyAppreciation = new Array(8);
  let effectiveNetCashFlow = new Array(8);
  let purchaseprice = document.getElementById("purchaseprice").value.replace(/,/g, "") * 1;

  for (let x = 0; x < yearNo; x++) {
    plusPrincipalPayDown[x] = -CUMPRINC(
      interestRate / 12,
      12 * loanTerm,
      morgageCalculationArray[0],
      year[x] - 11,
      year[x],
      0
    );
  }
  plusYearlyAppreciation[0] = propertyValue[0] - purchaseprice;

  for (let x = 1; x < yearNo; x++) {
    plusYearlyAppreciation[x] = propertyValue[x] - propertyValue[x - 1];
  }
  for (let x = 0; x < yearNo; x++) {
    effectiveNetCashFlow[x] =
      annualCashFlow[x] + plusPrincipalPayDown[x] + plusYearlyAppreciation[x];
  }
  // console.log('/////////')
  console.log(plusPrincipalPayDown);
  console.log(plusYearlyAppreciation);
  console.log(effectiveNetCashFlow);
  for (let x = 0; x < yearNo; x++) {
    returnOnEquity[x] = effectiveNetCashFlow[x] / equityWealth[x];
  }
  let plusSalesProceeds = new Array(8);
  let plusAccumulatedCash = new Array(8);
  let effectiveFutureValue = new Array(8);
  for (let x = 0; x < yearNo; x++) {
    plusSalesProceeds[x] = annualCashFlow[x] + equityWealth[x] - propertyValue[x] * f44;
    plusAccumulatedCash[x] = 0;

    for (let y = 0; y <= x; y++) {
      plusAccumulatedCash[x] += annualCashFlow[y];
    }
    effectiveFutureValue[x] = plusSalesProceeds[x] + plusAccumulatedCash[x] - annualCashFlow[x];
  }
  for (let x = 0; x < yearNo; x++) {
    annualizaedReturnOfReturn[x] =
      Math.pow(effectiveFutureValue[x] / cashToPurchaseArray[2], 1 / (year[x] / 12)) - 1;
  }
  internalRateOfReturn[0] = IRR([-cashToPurchaseArray[2], plusSalesProceeds[0]]);
  for (let x = 1; x < yearNo; x++) {
    let arr = new Array();
    for (let y = 0; y < x; y++) {
      arr.push(annualCashFlow[y]);
    }
    internalRateOfReturn[x] = IRR([-cashToPurchaseArray[2], ...arr, plusSalesProceeds[x]]);
  }
  returnOnInvestment[0] = (plusSalesProceeds[0] - cashToPurchaseArray[2]) / cashToPurchaseArray[2];

  for (let x = 1; x < yearNo; x++) {
    let accumulation = 0;
    for (let y = 0; y < x; y++) {
      accumulation += annualCashFlow[y];
    }
    returnOnInvestment[x] =
      (accumulation + plusSalesProceeds[x] - cashToPurchaseArray[2]) / cashToPurchaseArray[2];
  }
  financialPerformanceSummary[0] =
    (grossScheduleIncome[0] - totalOperatingExpenses[0]) / purchaseprice;
  financialPerformanceSummary[1] = cashOnCashReturn[0];
  financialPerformanceSummary[2] = equityWealth[4];

  updateTable(
    grossScheduleIncome,
    lessVacancyAllowance,
    totalOperatingIncome,
    propertyTaxes,
    insurance,
    utilities,
    miscExpenses,
    MaintenanceReserve,
    propertyManagement,
    totalOperatingExpenses,
    netOperatingIncome,
    lessMortgageExpenses,
    annualCashFlow,
    monthlyCashFlow,
    depreciation,
    mortgageInterest,
    propertyValue,
    lessMortgageBalance,
    equityWealth,
    capitalizationRate,
    cashOnCashReturn,
    returnOnEquity,
    annualizaedReturnOfReturn,
    internalRateOfReturn,
    returnOnInvestment
  );
  updateUI(
    morgageCalculationArray,
    cashToPurchaseArray,
    financialPerformanceSummary,
    basicPurchaseInfoArray
  );
}

function updateUI(
  morgageCalculationArray,
  cashToPurchaseArray,
  financialPerformanceSummary,
  basicPurchaseInfoArray
) {
  //////////////////////////////////////////////
  // OUTPUT FIELDS
  //////////////////////////////////////////////
  // 1. Basic Purchase Information
  document.getElementById("downPayment1").value = addCommas(Math.round(basicPurchaseInfoArray[0]));
  document.getElementById("equityatpurchase").value = addCommas(
    Math.round(basicPurchaseInfoArray[1])
  );
  // 2. Mortgage Calculations
  document.getElementById("loanAmount").value = addCommas(Math.round(morgageCalculationArray[0]));
  document.getElementById("annualPayment").value = addCommas(
    Math.round(morgageCalculationArray[1])
  );
  document.getElementById("monthlyPayment").value = addCommas(
    Math.round(morgageCalculationArray[2])
  );
  // 3. Cash to purchase
  document.getElementById("downPayment3").value = addCommas(Math.round(cashToPurchaseArray[0]));
  document.getElementById("closingCost").value = addCommas(Math.round(cashToPurchaseArray[1]));
  document.getElementById("totalCashRequired").value = addCommas(
    Math.round(cashToPurchaseArray[2])
  );
  // 4. Financial Performance Summary
  document.getElementById("downPayment4").innerHTML =
    (financialPerformanceSummary[0] == financialPerformanceSummary[0]
      ? financialPerformanceSummary[0] * 100
      : 0
    ).toFixed(2) + "%";
  document.getElementById("closingCost2").innerHTML =
    (financialPerformanceSummary[1] == financialPerformanceSummary[1]
      ? financialPerformanceSummary[1] * 100
      : 0
    ).toFixed(2) + "%";
  document.getElementById("totalCastRequired2").innerHTML =
    "$" +
    addCommas(
      Math.round(
        financialPerformanceSummary[2] == financialPerformanceSummary[2]
          ? financialPerformanceSummary[2]
          : 0
      )
    );

  document.getElementById("calculateBox").style.display = "block";
  document.getElementById("financialSummaryBox").style.display = "block";
}
function updateTable(
  grossScheduleIncome,
  lessVacancyAllowance,
  totalOperatingIncome,
  propertyTaxes,
  insurance,
  utilities,
  miscExpenses,
  MaintenanceReserve,
  propertyManagement,
  totalOperatingExpenses,
  netOperatingIncome,
  lessMortgageExpenses,
  annualCashFlow,
  monthlyCashFlow,
  depreciation,
  mortgageInterest,
  propertyValue,
  lessMortgageBalance,
  equityWealth,
  capitalizationRate,
  cashOnCashReturn,
  returnOnEquity,
  annualizaedReturnOfReturn,
  internalRateOfReturn,
  returnOnInvestment
) {
  let grossScheduleIncomeEles = document.querySelectorAll("#grossScheduleIncome--td");
  let lessVacancyAllowanceEles = document.querySelectorAll("#lessVacancyAllowance--td");
  let totalOperatingIncomeEles = document.querySelectorAll("#totalOperatingIncome--td");
  let insuranceEles = document.querySelectorAll("#insurance--td");
  let propertyTaxesEles = document.querySelectorAll("#propertyTaxes--td");
  let utilitiesEles = document.querySelectorAll("#utilities--td");
  let miscExpensesEles = document.querySelectorAll("#miscExpenses--td");
  let propertyManagementEles = document.querySelectorAll("#propertyManagement--td");
  let maintenaneReserveEles = document.querySelectorAll("#maintenaneReserve--td");
  let totalOperatingExpensesEles = document.querySelectorAll("#totalOperatingExpenses--td");
  let netOperatingIncomeEles = document.querySelectorAll("#netOperatingIncome--td");
  let lessMortgageExpenseEles = document.querySelectorAll("#lessMortgageExpense--td");
  let annualCashFlowEles = document.querySelectorAll("#annualCashFlow--td");
  let depreciationEles = document.querySelectorAll("#depreciation--td");
  let monthlyCashFlowEles = document.querySelectorAll("#monthlyCashFlow--td");
  let mortgageInterestEles = document.querySelectorAll("#mortgageInterest--td");
  let propertyValueEles = document.querySelectorAll("#propertyValue--td");
  let equityEles = document.querySelectorAll("#equity--td");
  let CapatalizationEle = document.querySelectorAll("#Capatalization--td");
  let lessMortgageBalanceEles = document.querySelectorAll("#lessMortgageBalance--td");
  let cashOnCashReturnEles = document.querySelectorAll("#cashOnCashReturn--td");
  let returnOnEquityEles = document.querySelectorAll("#returnOnEquity--td");
  let annualizedReturnEles = document.querySelectorAll("#annualizedReturn--td");
  let internalRateofReturnEles = document.querySelectorAll("#internalRateofReturn--td");
  let returnOnInvestmentEles = document.querySelectorAll("#returnOnInvestment--td");

  for (let x = 0; x < 30; x++) {
    if (!((x >= 0 && x <= 4) || x == 9 || x == 19 || x == 29)) continue;
    let index = 0;
    if (x == 0) index = 0;
    else if (x == 1) index = 1;
    else if (x == 2) index = 2;
    else if (x == 3) index = 3;
    else if (x == 4) index = 4;
    else if (x == 9) index = 5;
    else if (x == 19) index = 6;
    else if (x == 29) index = 7;

    grossScheduleIncomeEles[index].innerHTML = "$" + addCommas(Math.round(grossScheduleIncome[x]));
    lessVacancyAllowanceEles[index].innerHTML =
      "$" + addCommas(Math.round(lessVacancyAllowance[x]));
    totalOperatingIncomeEles[index].innerHTML =
      "$" + addCommas(Math.round(totalOperatingIncome[x]));
    propertyTaxesEles[index].innerHTML = "$" + addCommas(Math.round(propertyTaxes[x]));
    insuranceEles[index].innerHTML = "$" + addCommas(Math.round(insurance[x]));
    utilitiesEles[index].innerHTML = "$" + addCommas(Math.round(utilities[x]));
    miscExpensesEles[index].innerHTML = "$" + addCommas(Math.round(miscExpenses[x]));
    maintenaneReserveEles[index].innerHTML = "$" + addCommas(Math.round(MaintenanceReserve[x]));
    propertyManagementEles[index].innerHTML = "$" + addCommas(Math.round(propertyManagement[x]));
    totalOperatingExpensesEles[index].innerHTML =
      "$" + addCommas(Math.round(totalOperatingExpenses[x]));
    netOperatingIncomeEles[index].innerHTML = "$" + addCommas(Math.round(netOperatingIncome[x]));
    lessMortgageExpenseEles[index].innerHTML = "$" + addCommas(Math.round(lessMortgageExpenses[x]));
    annualCashFlowEles[index].innerHTML = "$" + addCommas(Math.round(annualCashFlow[x]));
    monthlyCashFlowEles[index].innerHTML = "$" + addCommas(Math.round(monthlyCashFlow[x]));
    depreciationEles[index].innerHTML = "$" + addCommas(Math.round(depreciation[x]));
    mortgageInterestEles[index].innerHTML = "$" + addCommas(Math.round(mortgageInterest[x]));
    propertyValueEles[index].innerHTML = "$" + addCommas(Math.round(propertyValue[x]));
    lessMortgageBalanceEles[index].innerHTML = "$" + addCommas(Math.round(lessMortgageBalance[x]));
    equityEles[index].innerHTML = "$" + addCommas(Math.round(equityWealth[x]));
    CapatalizationEle[index].innerHTML =
      (capitalizationRate[x] == capitalizationRate[x] ? capitalizationRate[x] * 100 : 0).toFixed(
        2
      ) + "%";
    cashOnCashReturnEles[index].innerHTML =
      (cashOnCashReturn[x] == cashOnCashReturn[x] ? cashOnCashReturn[x] * 100 : 0).toFixed(2) + "%";
    returnOnEquityEles[index].innerHTML =
      (returnOnEquity[x] == returnOnEquity[x] ? returnOnEquity[x] * 100 : 0).toFixed(2) + "%";
    annualizedReturnEles[index].innerHTML =
      (annualizaedReturnOfReturn[x] == annualizaedReturnOfReturn[x]
        ? annualizaedReturnOfReturn[x] * 100
        : 0
      ).toFixed(2) + "%";
    internalRateofReturnEles[index].innerHTML =
      (internalRateOfReturn[x] == internalRateOfReturn[x]
        ? internalRateOfReturn[x] * 100
        : 0
      ).toFixed(2) + "%";
    returnOnInvestmentEles[index].innerHTML =
      (returnOnInvestment[x] == returnOnInvestment[x] ? returnOnInvestment[x] * 100 : 0).toFixed(
        2
      ) + "%";
  }
}
function addCommas(x) {
  x = x || 0;
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
function PMTDiff(ir, np, pv, fv = 0) {
  var presentValueInterstFector = Math.pow(1 + ir, np);
  var pmt = (ir * pv * (presentValueInterstFector + fv)) / (presentValueInterstFector - 1);
  return pmt;
}

// Excel Functions
function COMITPMT(rate, periods, value, start, end, type) {
  // Credits: algorithm inspired by Apache OpenOffice
  // Credits: Hannes Stiebitzhofer for the translations of function and variable names
  // Requires exports.FV() and exports.PMT() from exports.js [http://stoic.com/exports/]

  // Return error if either rate, periods, or value are lower than or equal to zero
  if (rate <= 0 || periods <= 0 || value <= 0) {
    return;
  }

  // Return error if start < 1, end < 1, or start > end
  if (start < 1 || end < 1 || start > end) {
    return;
  }

  // Return error if type is neither 0 nor 1
  if (type !== 0 && type !== 1) {
    return;
  }

  // Compute cumulative interest
  var payment = PMT(rate, periods, value, 0, type);
  var interest = 0;

  if (start === 1) {
    if (type === 0) {
      interest = -value;
      start++;
    }
  }

  for (var i = start; i <= end; i++) {
    if (type === 1) {
      interest += FV(rate, i - 2, payment, value, 1) - payment;
    } else {
      interest += FV(rate, i - 1, payment, value, 0);
    }
  }
  interest *= rate;

  // Return cumulative interest
  return interest;
}

function CUMPRINC(rate, periods, value, start, end, type) {
  // Credits: algorithm inspired by Apache OpenOffice
  // Credits: Hannes Stiebitzhofer for the translations of function and variable names
  // Requires getFutureValue() and getPartialPayment() from Formula.js [http://stoic.com/formula/]

  // Evaluate rate and periods (TODO: replace with secure expression evaluator)

  // Return error if either rate, periods, or value are lower than or equal to zero
  if (rate <= 0 || periods <= 0 || value <= 0) return;

  // Return error if start < 1, end < 1, or start > end
  if (start < 1 || end < 1 || start > end) return;

  // Return error if type is neither 0 nor 1
  if (type !== 0 && type !== 1) return;

  // Compute cumulative principal
  var payment = PMT(rate, periods, value, 0, type);
  var principal = 0;
  if (start === 1) {
    if (type === 0) {
      principal = payment + value * rate;
    } else {
      principal = payment;
    }
    start++;
  }
  for (var i = start; i <= end; i++) {
    if (type > 0) {
      principal += payment - (FV(rate, i - 2, payment, value, 1) - payment) * rate;
    } else {
      principal += payment - FV(rate, i - 1, payment, value, 0) * rate;
    }
  }

  // Return cumulative principal
  return principal;
}
function FV(rate, periods, payment, value, type) {
  // Credits: algorithm inspired by Apache OpenOffice

  value = value || 0;
  type = type || 0;

  // Return future value
  var result;
  if (rate === 0) {
    result = value + payment * periods;
  } else {
    var term = Math.pow(1 + rate, periods);
    if (type === 1) {
      result = value * term + (payment * (1 + rate) * (term - 1)) / rate;
    } else {
      result = value * term + (payment * (term - 1)) / rate;
    }
  }
  return -result;
}

function PMT(rate, periods, present, future, type) {
  // Credits: algorithm inspired by Apache OpenOffice

  future = future || 0;
  type = type || 0;

  // Return payment
  var result;
  if (rate === 0) {
    result = (present + future) / periods;
  } else {
    var term = Math.pow(1 + rate, periods);
    if (type === 1) {
      result = ((future * rate) / (term - 1) + (present * rate) / (1 - 1 / term)) / (1 + rate);
    } else {
      result = (future * rate) / (term - 1) + (present * rate) / (1 - 1 / term);
    }
  }
  return -result;
}

function enableSliders() {
  calculateOnInput = true;
}
function downloadPDF() {
  createTableForOutputValuesInEmailAndPDF();
  let uname = document.getElementById("uname").value;
  var doc = new jsPDF();
  doc.setFontSize(20);
  // Hi "Name",
  // Here is your Real Estate Financial Analysis report that you requested from Stenneth Capital.
  // Some contacts at Stenneth Capital are below
  // 1. Investor page: https://stennethcapital.com/investors
  // 2. Contact us: https://stennethcapital.com/
  // 3. Book a free 30 minute discussion via Zoom: https://stennethcapital.com/
  // 4. Frequently ask Questions (FAQ): https://stennethcapital.com/about-us
  doc.setFontSize(12);

  doc.text(`Hi ${uname},`, 35, 16);
  doc.text(
    `Here is your Real Estate Financial Analysis report that you requested from Stenneth Capital.`,
    35,
    22
  );
  doc.text(`Some contacts at Stenneth Capital are below.`, 35, 28);
  doc.text(`1. Investor page:https://stennethcapital.com/investors .`, 35, 34);
  doc.text(`2. Contact us:https://stennethcapital.com/ .`, 35, 40);
  doc.text(`3. Book a free 30 minute discussion via Zoom:https://stennethcapital.com/.`, 35, 46);
  doc.text(
    `4. Frequently ask Questions (FAQ):https://stennethcapital.com/about-usabout-us.`,
    35,
    52
  );

  doc.autoTable({
    startY: 75,
    html: "#table5",
    styles: { overflow: "linebreak", columnWidth: "wrap", fontSize: 6 },
    columnStyles: {
      1: { halign: "right" },
    },
  });
  doc.autoTable({
    startY: 95,
    html: "#table6",
    styles: { overflow: "linebreak", columnWidth: "wrap", fontSize: 6 },
    columnStyles: {
      1: { halign: "right" },
    },
  });
  doc.autoTable({
    startY: 130,
    html: "#table7",
    styles: { overflow: "linebreak", columnWidth: "wrap", fontSize: 6 },
    columnStyles: {
      1: { halign: "right" },
    },
  });
  doc.autoTable({
    startY: 155,
    html: "#table8",
    styles: { overflow: "linebreak", columnWidth: "wrap", fontSize: 6 },
    columnStyles: {
      1: { halign: "right" },
    },
  });
  doc.addPage();

  // calculator__table
  doc.autoTable({
    startY: 20,
    html: "#table1",
    styles: { overflow: "linebreak", columnWidth: "wrap", fontSize: 6 },
  });

  doc.autoTable({
    startY: 180,
    html: "#table2",
    styles: { overflow: "linebreak", columnWidth: "wrap", fontSize: 6 },
  });
  doc.autoTable({
    startY: 220,
    html: "#table3",
    styles: { overflow: "linebreak", columnWidth: "wrap", fontSize: 6 },
  });
  doc.autoTable({
    startY: 265,
    html: "#table4",
    styles: { overflow: "linebreak", columnWidth: "wrap", fontSize: 6 },
  });

  window.open(URL.createObjectURL(doc.output("blob")));
  doc.save('test.pdf');
}

function createTableForOutputValuesInEmailAndPDF() {
  let html = `
  
  <table id="table5">
  <thead>
    <tr style="padding: 10px">
      <th style="background-color: #333; color: #fff; padding: 10px" colspan="3" scope="col">
        Basic Purchase Information
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th style="padding: 7px 10px; text-align: left">Down Payment</th>
      <td style="padding: 7px 10px; text-align: left">${
        "$" + document.getElementById("downPayment1").value
      }&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr>
      <th style="padding: 7px 10px; text-align: left">Equity at Purchase</th>
      <td style="padding: 7px 10px; text-align: left">${
        "$" + document.getElementById("equityatpurchase").value
      }&nbsp;&nbsp;&nbsp;</td>
    </tr>
  </tbody>
</table>
<table id="table6">
  <thead>
    <tr style="padding: 10px">
      <th style="background-color: #333; color: #fff; padding: 10px" colspan="3" scope="col">
        MORTGAGE CALCULATION
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th style="padding: 7px 10px; text-align: left">Loan Amount</th>
      <td style="padding: 7px 10px; text-align: left">${
        "$" + document.getElementById("loanAmount").value
      }&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr>
      <th style="padding: 7px 10px; text-align: left">Annual Payment</th>
      <td style="padding: 7px 10px; text-align: left">${
        "$" + document.getElementById("annualPayment").value
      }&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr>
      <th style="padding: 7px 10px; text-align: left">Monthly Payment</th>
      <td style="padding: 7px 10px; text-align: left">${
        "$" + document.getElementById("monthlyPayment").value
      }&nbsp;&nbsp;&nbsp;</td>
    </tr>
  </tbody>
</table>


<table id="table7">
  <thead>
    <tr style="padding: 10px">
      <th style="background-color: #333; color: #fff; padding: 10px" colspan="3" scope="col">
        CASH TO PURCHASE
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th style="padding: 7px 10px; text-align: left">Down Payment</th>
      <td style="padding: 7px 10px; text-align: left">${(
        "$" + document.getElementById("downPayment3").value
      ).trim()}</td>
    </tr>
    <tr>
      <th style="padding: 7px 10px; text-align: left">Closing Costs</th>
      <td style="padding: 7px 10px; text-align: left">${(
        "$" + document.getElementById("closingCost").value
      ).trim()}</td>
    </tr>
    <tr>
      <th style="padding: 7px 10px; text-align: left">Total Cash Required</th>
      <td style="padding: 7px 10px; text-align: left">${(
        "$" + document.getElementById("totalCashRequired").value
      ).trim()}</td>
    </tr>
  </tbody>
</table>
<table id="table8">
  <thead>
    <tr style="padding: 10px">
      <th style="background-color: #333; color: #fff; padding: 10px" colspan="3" scope="col">
        FINANCIAL PERFORMANCE SUMMARY
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th style="padding: 7px 10px; text-align: left">Capitalization Rate</th>
      <td style="padding: 7px 10px; text-align: left">${
        document.getElementById("downPayment4").innerHTML
      }&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr>
      <th style="padding: 7px 10px; text-align: left">Cash-on-Cash Return</th>
      <td style="padding: 7px 10px; text-align: left">${
        document.getElementById("closingCost2").innerHTML
      }&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr>
      <th style="padding: 7px 10px; text-align: left">Total Equity (Year 5)</th>
      <td style="padding: 7px 10px; text-align: left">${
        document.getElementById("totalCastRequired2").innerHTML
      }&nbsp;&nbsp;&nbsp;</td>
    </tr>
  </tbody>
</table>
`;
  document.getElementById("invisibleTable").innerHTML = html;
}
function generateEmailMessage() {
  createTableForOutputValuesInEmailAndPDF();
  document.querySelectorAll(".tborder").forEach((el) => {
    el.style.padding = "10px";
  });
  document.querySelectorAll(".theading__calc").forEach((el) => {
    el.style.backgroundColor = "#333";
    el.style.color = "#fff";
  });
  document.querySelectorAll("#tborder").forEach((el) => {
    el.style.padding = 10;
  });
  document.querySelectorAll(".email__style").forEach((el) => {
    el.style.padding = "7px 10px";
    el.style.textAlign = "left";
  });
  document.querySelectorAll("#email__style").forEach((el) => {
    el.style.padding = "7px 10px";
    el.style.textAlign = "left";
  });
  let html = `<!DOCTYPE >
  <html>
      <body>
      ${document.getElementById("table5").innerHTML}
      &nbsp;&nbsp;
      ${document.getElementById("table6").innerHTML}
      &nbsp;&nbsp;
      ${document.getElementById("table7").innerHTML}
      &nbsp;&nbsp;
      ${document.getElementById("table8").innerHTML}
      &nbsp;&nbsp;
      ${document.getElementById("table1").innerHTML}
      &nbsp;&nbsp;
      ${document.getElementById("table2").innerHTML}
      &nbsp;&nbsp;
      ${document.getElementById("table3").innerHTML}
      &nbsp;&nbsp;
      ${document.getElementById("table4").innerHTML}

      </body>
    </html>`;
  return html;
}
function sendEmail(ele) {
  ele.contact_number.value = (Math.random() * 100000) | 0;
  document.getElementById("btn__calc").value = "Please wait...";
  document.getElementById("btn__calc").disabled = true;
  // calculate();
  document.getElementById("message").value = generateEmailMessage();
  emailjs
    .sendForm("service_mh1wrdq", "template_mgz3fc8", ele)
    .then((msg) => {
      document.getElementById("btn__calc").value = "Get your financial analysis";
      document.getElementById("btn__calc").disabled = false;
      emailAlert();
    })
    .catch((err) => {
      alert(`${err} There was an error while sending an email. Please try again`);
      console.log(err);
      // location.reload();
    });
}

document.getElementById("form__submit--calc").addEventListener("submit", function (e) {
  e.preventDefault();
  calculateResult();
  checkOptions(this);
});

function checkOptions(ele) {
  document.getElementById("option1").checked
    ? document.querySelectorAll(".table__responsive--calc").forEach((el) => {
        el.style.display = "block";
      })
    : document.querySelectorAll(".table__responsive--calc").forEach((el) => {
        el.style.display = "none";
      });
  document.getElementById("option2").checked ? downloadPDF() : "";
  if (document.getElementById("option3").checked) {
    if (!(document.getElementById("uname").value && document.getElementById("uemail").value)) {
      alert("Please provide email or user name");
    } else {
      sendEmail(ele);
    }
  }
}
function emailAlert() {
  document.getElementById("success-alert").style.display = "block";
  document.getElementById("success-alert").scrollIntoView();

  setTimeout(() => {
    document.getElementById("success-alert").style.display = "none";
  }, 4000);
}
// function getPDFURL() {
//   let uname = document.getElementById("uname").value;
//   var doc = new jsPDF();
//   doc.setFontSize(20);
//   //
//   doc.setFontSize(12);
//   doc.text(
//     `Financial Analysis report generated for ${uname}. This report is generated from Financial.`,
//     10,
//     10
//   );
//   doc.text(`Analysis Calculator.`, 10, 10);

//   // calculator__table
//   doc.autoTable({
//     startY: 37,
//     html: "#table1",
//     styles: { overflow: "linebreak", columnWidth: "wrap", fontSize: 6 },
//   });

//   doc.autoTable({
//     startY: 177,
//     html: "#table2",
//     styles: { overflow: "linebreak", columnWidth: "wrap", fontSize: 6 },
//   });
//   doc.autoTable({
//     startY: 200,
//     html: "#table3",
//     styles: { overflow: "linebreak", columnWidth: "wrap", fontSize: 6 },
//   });
//   doc.autoTable({
//     startY: 220,
//     html: "#table4",
//     styles: { overflow: "linebreak", columnWidth: "wrap", fontSize: 6 },
//   });

//   var out = doc.output();
//   var url = "data:application/pdf;base64," + btoa(out);
//   console.log(url);
//   return url;
// }
/*

console.log(
    "grossScheduleIncome" + grossScheduleIncome,
    "lessVacancyAllowance" + lessVacancyAllowance,
    "totalOperatingIncome" + totalOperatingIncome,
    "propertyTaxes" + propertyTaxes,
    "insurance" + insurance,
    "utilities" + utilities,
    "miscExpenses" + miscExpenses,
    "MaintenanceReserve" + MaintenanceReserve,
    "propertyManagement" + propertyManagement,
    "totalOperatingExpenses" + totalOperatingExpenses,
    "netOperatingIncome" + netOperatingIncome,
    "lessMortgageExpenses" + lessMortgageExpenses,
    "annualCashFlow" + annualCashFlow,
    "monthlyCashFlow" + monthlyCashFlow,
    "depreciation" + depreciation,
    "mortgageInterest" + mortgageInterest
  );
  console.log(
    "propertyValue" + propertyValue,
    "lessMortgageBalance" + lessMortgageBalance,
    "equityWealth" + equityWealth
  );
  console.log(
    "capitalizationRate" + capitalizationRate + "\n",
    "cashOnCashReturn" + cashOnCashReturn + "\n",
    "returnOnEquity" + returnOnEquity + "\n",
    "annualizaedReturnOfReturn" + annualizaedReturnOfReturn + "\n",
    "internalRateOfReturn" + internalRateOfReturn + "\n",
    "returnOnInvestment" + returnOnInvestment + "\n"
  );
  */

// Copyright (c) 2012 Sutoiku, Inc. (MIT License)

// Some algorithms have been ported from Apache OpenOffice:

/**************************************************************
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 *************************************************************/

function IRR(values, guess) {
  // Credits: algorithm inspired by Apache OpenOffice

  // Calculates the resulting amount
  var irrResult = function (values, dates, rate) {
    var r = rate + 1;
    var result = values[0];
    for (var i = 1; i < values.length; i++) {
      result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
    }
    return result;
  };

  // Calculates the first derivation
  var irrResultDeriv = function (values, dates, rate) {
    var r = rate + 1;
    var result = 0;
    for (var i = 1; i < values.length; i++) {
      var frac = (dates[i] - dates[0]) / 365;
      result -= (frac * values[i]) / Math.pow(r, frac + 1);
    }
    return result;
  };

  // Initialize dates and check that values contains at least one positive value and one negative value
  var dates = [];
  var positive = false;
  var negative = false;
  for (var i = 0; i < values.length; i++) {
    dates[i] = i === 0 ? 0 : dates[i - 1] + 365;
    if (values[i] > 0) positive = true;
    if (values[i] < 0) negative = true;
  }

  // Return error if values does not contain at least one positive value and one negative value
  if (!positive || !negative) return "#NUM!";

  // Initialize guess and resultRate
  var guess = typeof guess === "undefined" ? 0.1 : guess;
  var resultRate = guess;

  // Set maximum epsilon for end of iteration
  var epsMax = 1e-10;

  // Set maximum number of iterations
  var iterMax = 50;

  // Implement Newton's method
  var newRate, epsRate, resultValue;
  var iteration = 0;
  var contLoop = true;
  do {
    resultValue = irrResult(values, dates, resultRate);
    newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
    epsRate = Math.abs(newRate - resultRate);
    resultRate = newRate;
    contLoop = epsRate > epsMax && Math.abs(resultValue) > epsMax;
  } while (contLoop && ++iteration < iterMax);

  if (contLoop) return "#NUM!";

  // Return internal rate of return
  return resultRate;
}
