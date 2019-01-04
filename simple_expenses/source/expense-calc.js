import { getExpenses } from './expenses.js'

// COMBINED TOTALS //
const sumGBPTotal = () => {
    const myExpenses = getExpenses()
    let myTotal = 0
    myExpenses.forEach((expense) => {
        if (expense.currency === 'GBP') {
            myTotal = myTotal + expense.ammount
        }
    })
    return myTotal
    
}

const sumUSDTotal = () => {
    const myExpenses = getExpenses()
    let myTotal = 0
    myExpenses.forEach((expense) => {
        if (expense.currency === 'USD') {
            myTotal = myTotal + expense.ammount
        }
    })
    return myTotal
    
}

const sumEURTotal = () => {
    const myExpenses = getExpenses()
    let myTotal = 0
    myExpenses.forEach((expense) => {
        if (expense.currency === 'EUR') {
            myTotal = myTotal + expense.ammount
        }
    })
    return myTotal
    
}

// INCOME ONLY TOTALS //
const sumGBPIncome = () => {
    const myExpenses = getExpenses()
    let myTotal = 0
    myExpenses.forEach((expense) => {
        if (expense.currency === 'GBP' && expense.ammount > 0) {
            myTotal = myTotal + expense.ammount
        }
    })
    return myTotal
    
}

const sumUSDIncome = () => {
    const myExpenses = getExpenses()
    let myTotal = 0
    myExpenses.forEach((expense) => {
        if (expense.currency === 'USD' && expense.ammount > 0) {
            myTotal = myTotal + expense.ammount
        }
    })
    return myTotal
    
}

const sumEURIncome = () => {
    const myExpenses = getExpenses()
    let myTotal = 0
    myExpenses.forEach((expense) => {
        if (expense.currency === 'EUR' && expense.ammount > 0) {
            myTotal = myTotal + expense.ammount
        }
    })
    return myTotal
    
}

// EXPENSE ONLY TOTALS //
const sumGBPExpense = () => {
    const myExpenses = getExpenses()
    let myTotal = 0
    myExpenses.forEach((expense) => {
        if (expense.currency === 'GBP' && expense.ammount < 0) {
            myTotal = myTotal + expense.ammount
        }
    })
    return myTotal
    
}

const sumUSDExpense = () => {
    const myExpenses = getExpenses()
    let myTotal = 0
    myExpenses.forEach((expense) => {
        if (expense.currency === 'USD' && expense.ammount < 0) {
            myTotal = myTotal + expense.ammount
        }
    })
    return myTotal
    
}

const sumEURExpense = () => {
    const myExpenses = getExpenses()
    let myTotal = 0
    myExpenses.forEach((expense) => {
        if (expense.currency === 'EUR' && expense.ammount < 0) {
            myTotal = myTotal + expense.ammount
        }
    })
    return myTotal
    
}

export { sumGBPTotal, sumUSDTotal, sumEURTotal, sumGBPIncome, sumUSDIncome, sumEURIncome, sumGBPExpense, sumUSDExpense, sumEURExpense }