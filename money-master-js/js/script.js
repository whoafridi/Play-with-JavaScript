// css alternate style
document.getElementById('first-portion').addEventListener('mouseover', function () {
    document.getElementById('first-portion').style.overflow = 'hidden';
});
document.querySelector('#site-image img').style.filter = 'grayscale(100%)';
document.querySelector('#site-image img').addEventListener('mouseover', function () {
    document.querySelector('#site-image img').style.transition = '1s linear';
    document.querySelector('#site-image img').style.filter = 'grayscale(0%)';
});
document.querySelector('#site-image img').addEventListener('mouseout', function () {
    document.querySelector('#site-image img').style.transition = '1s linear';
    document.querySelector('#site-image img').style.filter = 'grayscale(100%)';
});

// default value set yet
function defaultValue(elementID1, elementID2) {
    document.getElementById(elementID1).innerText = 0.00;
    document.getElementById(elementID2).innerText = 0.00;
}

// change warning color
function warningColor(warning) {
    document.getElementById(warning).style.color = 'red';
}

// set inner value
function setInnerValue(elementID, elementValue) {
    document.getElementById(elementID).innerText = elementValue;
}

// get float number
function getFloatNumber(inputValue) {
    const floatValue = parseFloat(inputValue);
    return floatValue;
}

// grab input value
function getInputValue(inputValue) {
    if (isNaN(document.getElementById(inputValue).value)) {
        return -1;
    }
    else {
        const floatValue = getFloatNumber(document.getElementById(inputValue).value);
        return floatValue;
    }
}

// calculate expenses
document.getElementById('calc-btn').addEventListener('click', function () {
    let incomeInput = getInputValue('income-input');
    let foodInput = getInputValue('food-input');
    let rentInput = getInputValue('rent-input');
    let clothInput = getInputValue('cloth-input');

    // calculation and output
    const totalExpense = (foodInput + rentInput + clothInput);
    const restBalance = (incomeInput - totalExpense);
    if (incomeInput < 0 || foodInput < 0 || rentInput < 0 || clothInput < 0) {
        document.getElementById('expense-warning').innerText = 'String and Negative not allow!';
        warningColor('expense-warning');
    }

    else {
        // calculation and output
        if (totalExpense <= incomeInput) {
            setInnerValue('price-total', totalExpense);
            setInnerValue('price-balance', restBalance);
            setInnerValue('expense-warning', '');
        }

        // error messages
        else if (totalExpense > incomeInput) {
            defaultValue('price-total', 'price-balance');
            document.getElementById('expense-warning').innerText = 'expenses overlap income!';
            warningColor('expense-warning');
        }
        else {
            defaultValue('price-total', 'price-balance');
            document.getElementById('expense-warning').innerText = 'Income or Expense segment is not fetched!';
            warningColor('expense-warning');
        }
    }
});

// calculate savings
document.getElementById('save-btn').addEventListener('click', function () {
    let incomeInput = getInputValue('income-input');
    let foodInput = getInputValue('food-input');
    let rentInput = getInputValue('rent-input');
    let clothInput = getInputValue('cloth-input');
    const totalExpense = (foodInput + rentInput + clothInput);
    const restBalance = (incomeInput - totalExpense);
    const saveInput = getInputValue('save-input');
    const priceSaving = ((saveInput / 100) * incomeInput);
    const restSavings = restBalance - priceSaving;

    if (saveInput <= 0) {
        document.getElementById('saving-warning').innerText = 'String, Zero and Negative not allow!';
        warningColor('saving-warning');
    }

    else if (((saveInput >= 1) && (saveInput <= 100))) {
        // calculation and output
        if (priceSaving <= restBalance) {
            setInnerValue('price-saving', priceSaving);
            setInnerValue('price-remaining', restSavings);
            setInnerValue('saving-warning', '');
        }

        // error message
        else {
            defaultValue('price-saving', 'price-remaining');
            document.getElementById('saving-warning').innerText = 'savings overlap rest amount!';
            warningColor('saving-warning');
        }
    }
    
    // error message
    else {
        document.getElementById('price-saving').innerText = 0.00;
        document.getElementById('price-remaining').innerText = 0.00;
        if (saveInput <= 0) {
            document.getElementById('saving-warning').innerText = 'wrong commission input!';
            warningColor('saving-warning');
        }
        else {
            document.getElementById('saving-warning').innerText = 'Savings segment is not fetched!';
            warningColor('saving-warning');
        }
    }
});
