//import {  } from './index.js'
import { initialiseEditPage, updatedTime } from './views.js';
import { getExpenses, saveExpenses, updateExpense, removeExpense } from './expenses.js';

const titleElement = document.querySelector('#expense-title')
const detailElement = document.querySelector('#expense-detail')
const ammountElement = document.querySelector('#expense-ammount')
const currencyElement = document.querySelector('#expense-currency')
const incomeElement = document.querySelector('#is-income')
const removeElement = document.querySelector('#remove-expense')
const lastUpdated = document.querySelector('#last-updated')
const expenseID = location.hash.substring(1)


initialiseEditPage(expenseID)


//update expense title
titleElement.addEventListener('input', (e) => {
    const expense = updateExpense(expenseID, {
        title: e.target.value
    })
    lastUpdated.textContent = updatedTime(expense.updatedAt)
})

//update expense detail
detailElement.addEventListener('input', (e) => {
    const expense = updateExpense(expenseID, {
        detail: e.target.value
    })
    lastUpdated.textContent = updatedTime(expense.updatedAt)
})

//update expense ammount
ammountElement.addEventListener('input', (e) => {
    const expense = updateExpense(expenseID, {
        ammount: e.target.value
    })
    lastUpdated.textContent = updatedTime(expense.updatedAt)
})

//update expense currency
currencyElement.addEventListener('change', (e) => {
    const expense = updateExpense(expenseID, {
        currency: e.target.value
    })
    lastUpdated.textContent = updatedTime(expense.updatedAt)
})

//update is-income
incomeElement.addEventListener('input', (e) => {
    const expense = updateExpense(expenseID, {
        income: e.target.checked
    })
    lastUpdated.textContent = updatedTime(expense.updatedAt)
})

//remove note
removeElement.addEventListener('click', () => {
    removeExpense(expenseID)
    location.assign('/index.html')
})


document.querySelector('#save-expense').addEventListener('click', (e) => {
    saveExpenses()
    const saveNoteification = document.createElement('p')
    saveNoteification.textContent = 'Expense saved!'
    saveNoteification.classList.add('notification')
    document.querySelector('body').appendChild(saveNoteification)

    //location.assign(`/edit.html#${id}`)
    console.log(getExpenses())

})