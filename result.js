document.querySelector(".calculate-btn").addEventListener("click", function () {
    // Get input values
    let MortgageAmount = parseFloat(document.querySelector("#group1 input").value);
    let MortgageTerm = parseFloat(document.querySelector("#group2 input").value);
    let InterestRate = parseFloat(document.querySelector("#group3 input").value);

    // Check input values
    if (isNaN(MortgageAmount) || isNaN(MortgageTerm) || isNaN(InterestRate) || MortgageAmount <= 0 || MortgageTerm <= 0 || InterestRate <= 0) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Convert interest rate to monthly rate
    let monthlyInterestRate = (InterestRate / 100) / 12;

    // Number of payments
    let numberOfPayments = MortgageTerm * 12;

    // Check mortgage type
    let isRepayment = document.querySelector("#repayment").checked;
    let monthlyPayment;

    if (isRepayment) {
        // Repayment Mortgage Formula
        monthlyPayment = MortgageAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    } else {
        // Interest-Only Mortgage Formula
        monthlyPayment = MortgageAmount * monthlyInterestRate;
    }

    // Calculate the total amount paid
    let totalAmountPaid = monthlyPayment * numberOfPayments;

    // Select the calculator div
    let calculatorDiv = document.querySelector(".calculator");

    // Display the result
    document.querySelector(".calculator h2").innerText = "Monthly Repayment";
    let resultText = document.querySelector(".calculator p");
    resultText.innerText = `£${monthlyPayment.toFixed(2)}`;
    resultText.style.color = "hsl(61, 70%, 52%)";
    resultText.style.fontSize = "25px";

    // Check if the Total Amount Paid element already exists
    let totalPaidElement = document.querySelector(".total-paid");

    if (!totalPaidElement) {
        // Create a new <p> element for total amount paid
        totalPaidElement = document.createElement("p");
        totalPaidElement.classList.add("total-paid");
        calculatorDiv.appendChild(totalPaidElement);
    }

    // Update the text content of the new <p> element
    totalPaidElement.innerText = `💸 Total Amount Paid: £${totalAmountPaid.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

    // Fix Clear Button Functionality
    let clearBtn = document.querySelector("#clear-btn");

    clearBtn.addEventListener("click", function () {
        document.querySelectorAll(".input-box input").forEach(input => input.value = "");
        totalPaidElement.innerText = "";

        document.querySelector("#repayment").checked = false;
        document.querySelector("#interest").checked = false;

        document.querySelector(".calculator h2").innerText = "Results shown here";
        document.querySelector(".calculator p").innerText = 'Complete the form and click "Calculate Repayments" to see what your monthly repayments would be.';
        document.querySelector(".calculator p").style.color = "";
        document.querySelector(".calculator p").style.fontSize = "";
    });
});
