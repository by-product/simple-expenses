import { getExpenses, sortExpenses } from './expenses.js'
import { getFilters } from './filters.js'
import moment from 'moment'

// generate the DOM structure for a note
const generateExpenseDOM = (expense) => {
    const expenseElement = document.createElement('a')
    const summaryElement = document.createElement('div')
    const textElement = document.createElement('p')
    const ammountElement = document.createElement('p')
    const statusElement = document.createElement('p')
    // const button = document.createElement('button')

    // // Remove note button
    // button.textContent = 'x'
    // noteElement.appendChild(button)
    // button.addEventListener('click', () => {
    //     removeNote(note.id)
    //     saveNotes(notes)
    //     renderNotes(notes, filters)
    // })

    //set expense title text
    if (expense.title.length > 0) {
        textElement.textContent = expense.title
    } else {
        textElement.textContent = 'Unnamed expense'
    }
    textElement.classList.add('list-item__title')
    summaryElement.appendChild(textElement)

    //set expense ammount
    ammountElement.textContent = expense.ammount
    ammountElement.classList.add('list-item__ammount')
    if (expense.ammount < 0) {
        ammountElement.classList.add('list-item__ammount', 'list-item__ammount--negative')
    }
    summaryElement.appendChild(ammountElement)
    summaryElement.classList.add('item-summary', 'actions__container--spaced')
    expenseElement.appendChild(summaryElement)

    //edit expense
    expenseElement.setAttribute('href', `/edit.html#${expense.id}`)
    expenseElement.classList.add('expense-list', 'list-item')
    
    //set expense status
    statusElement.textContent = updatedTime(expense.updatedAt)
    statusElement.classList.add('list-item__subtitle')
    expenseElement.appendChild(statusElement)
        
    return expenseElement
}


// render Expenses 
const renderExpenses = () => {
    const expensesEl = document.querySelector('#expenses')
    const filters = getFilters()
    const expenses = sortExpenses(filters.sortBy)  
    const filterdExpenses = expenses.filter((expense) => expense.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    expensesEl.innerHTML = ''

    if (filterdExpenses.length > 0) {
        filterdExpenses.forEach((expense) => {
            const expenseElement = generateExpenseDOM(expense)
            expensesEl.appendChild(expenseElement)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'No expenses to show'
        expensesEl.appendChild(emptyMessage)
    }

    
}

//generate last edited
const updatedTime = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`

//Initialise Edit Page
const initialiseEditPage = (expenseID) => {
    const titleElement = document.querySelector('#expense-title')
    const detailElement = document.querySelector('#expense-detail')
    const ammountElement = document.querySelector('#expense-ammount')
    const incomeElement = document.querySelector('#is-income')
    const lastUpdated = document.querySelector('#last-updated')

    const expenses = getExpenses()
    const expense = expenses.find((expense) => expense.id === expenseID)
    
    if (!expense) {
        location.assign('/index.html')
    }
    
    //set note details
    titleElement.value = expense.title
    detailElement.value = expense.detail
    ammountElement.value = Math.abs(expense.ammount)
    incomeElement.checked = expense.income
    lastUpdated.textContent = updatedTime(expense.updatedAt)
}

export { updatedTime, initialiseEditPage, renderExpenses }