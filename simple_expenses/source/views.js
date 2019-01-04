import { getExpenses, sortExpenses, getCountry } from './expenses.js'
import { sumGBPTotal, sumUSDTotal, sumEURTotal, sumGBPIncome, sumUSDIncome, sumEURIncome, sumGBPExpense, sumUSDExpense, sumEURExpense } from './expense-calc.js'
import { getFilters } from './filters.js'
import moment from 'moment'

// generate the DOM structure for a note
const generateExpenseDOM = (expense) => {
    const expenseElement = document.createElement('a')
    const summaryElement = document.createElement('div')
    const textElement = document.createElement('p')
    const ammountElement = document.createElement('p')
    const currencyElement = document.createElement('p')
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

    //set currency and ammount
    const currencyAmmount = async () => {
        let symbol = await getCountry(expense.currency)

        if (symbol.currencies.length > 1) {
            symbol = symbol.currencies.find((currency) => currency.code === expense.currency)
            symbol = symbol.symbol
        } else {
            symbol = symbol.currencies[0].symbol
        }

        currencyElement.textContent = symbol
        currencyElement.classList.add('list-item__ammount')
        summaryElement.appendChild(currencyElement)

        //set expense ammount
        ammountElement.textContent = expense.ammount
        ammountElement.classList.add('list-item__ammount')
        if (expense.ammount < 0) {
            ammountElement.classList.add('list-item__ammount', 'list-item__ammount--negative')
        }
        currencyElement.appendChild(ammountElement)
        summaryElement.classList.add('item-summary', 'actions__container--spaced')
        expenseElement.appendChild(summaryElement)

        //set expense status
        statusElement.textContent = updatedTime(expense.updatedAt)
        statusElement.classList.add('list-item__subtitle')
        expenseElement.appendChild(statusElement)
        
    }

    currencyAmmount()

    //edit expense
    expenseElement.setAttribute('href', `/edit.html#${expense.id}`)
    expenseElement.classList.add('expense-list', 'list-item')
        
    return expenseElement
}

// generate the DOM structure for the totals
const generateTotalsDOM = () => {
    const totalsElement = document.createElement('div')
    const gbpTotal = document.createElement('div')
    const usdTotal = document.createElement('div')
    const eurTotal = document.createElement('div')
    const gTotal = document.createElement('p')
    const uTotal = document.createElement('p')
    const eTotal = document.createElement('p')
    const flavourText1 = document.createElement('p')
    const flavourText2 = document.createElement('p')
    const flavourText3 = document.createElement('p')
    const flavourText4 = document.createElement('p')

    //get combioned totals
    //set flavour text - combined total
    flavourText1.textContent = 'Totals'
    flavourText1.classList.add('list-item__totals--header')
    totalsElement.appendChild(flavourText1)
    flavourText2.textContent = 'GBP (£)'
    flavourText2.classList.add('list-item__currency--bold')
    gbpTotal.appendChild(flavourText2)
    flavourText3.textContent = 'USD ($)'
    flavourText3.classList.add('list-item__currency--bold')
    usdTotal.appendChild(flavourText3)
    flavourText4.textContent = 'EUR (€)'
    flavourText4.classList.add('list-item__currency--bold')
    eurTotal.appendChild(flavourText4)

    //get Combined Totals
    gTotal.textContent = sumGBPTotal()
    gbpTotal.appendChild(gTotal)
    uTotal.textContent =  sumUSDTotal()
    usdTotal.appendChild(uTotal)
    eTotal.textContent = sumEURTotal()
    eurTotal.appendChild(eTotal)

    //set display of combined totals
    totalsElement.appendChild(gbpTotal)
    totalsElement.appendChild(usdTotal)
    totalsElement.appendChild(eurTotal)
    totalsElement.classList.add('list-item__totals')

    //get income only
    const incomeTotalsElement = generateIncomeTotalsDOM()
    totalsElement.appendChild(incomeTotalsElement)

    //get expenses only
    const expenseTotalsElement = generateExpenseTotalsDOM()
    totalsElement.appendChild(expenseTotalsElement)

        
    return totalsElement
}

const generateIncomeTotalsDOM = () => {
    const incomeElement = document.createElement('div')
    const gbpIncome = document.createElement('div')
    const usdIncome = document.createElement('div')
    const eurIncome = document.createElement('div')
    const gIncome = document.createElement('p')
    const uIncome = document.createElement('p')
    const eIncome = document.createElement('p')
    const flavourText1 = document.createElement('p')
    const flavourText2 = document.createElement('p')
    const flavourText3 = document.createElement('p')
    const flavourText4 = document.createElement('p')


    //set flavour text - income total
    flavourText1.textContent = 'Income'
    flavourText1.classList.add('list-item__totals--header',)
    incomeElement.appendChild(flavourText1)
    flavourText2.textContent = 'GBP (£)'
    flavourText2.classList.add('list-item__currency--bold')
    gbpIncome.appendChild(flavourText2)
    flavourText3.textContent = 'USD ($)'
    flavourText3.classList.add('list-item__currency--bold')
    usdIncome.appendChild(flavourText3)
    flavourText4.textContent = 'EUR (€)'
    flavourText4.classList.add('list-item__currency--bold')
    eurIncome.appendChild(flavourText4)

    //get Income Totals
    gIncome.textContent = sumGBPIncome()
    gbpIncome.appendChild(gIncome)
    uIncome.textContent =  sumUSDIncome()
    usdIncome.appendChild(uIncome)
    eIncome.textContent = sumEURIncome()
    eurIncome.appendChild(eIncome)

    //set display of income totals
    incomeElement.appendChild(gbpIncome)
    incomeElement.appendChild(usdIncome)
    incomeElement.appendChild(eurIncome)
    incomeElement.classList.add('list-item__totals')

    return incomeElement
}

const generateExpenseTotalsDOM = () => {
    const expenseElement = document.createElement('div')
    const gbpExpense = document.createElement('div')
    const usdExpense = document.createElement('div')
    const eurExpense = document.createElement('div')
    const gExpense = document.createElement('p')
    const uExpense = document.createElement('p')
    const eExpense = document.createElement('p')
    const flavourText1 = document.createElement('p')
    const flavourText2 = document.createElement('p')
    const flavourText3 = document.createElement('p')
    const flavourText4 = document.createElement('p')


    //set flavour text - expense total
    flavourText1.textContent = 'Expense'
    flavourText1.classList.add('list-item__totals--header',)
    expenseElement.appendChild(flavourText1)
    flavourText2.textContent = 'GBP (£)'
    flavourText2.classList.add('list-item__currency--bold')
    gbpExpense.appendChild(flavourText2)
    flavourText3.textContent = 'USD ($)'
    flavourText3.classList.add('list-item__currency--bold')
    usdExpense.appendChild(flavourText3)
    flavourText4.textContent = 'EUR (€)'
    flavourText4.classList.add('list-item__currency--bold')
    eurExpense.appendChild(flavourText4)

    //get Expense Totals
    gExpense.textContent = sumGBPExpense()
    gbpExpense.appendChild(gExpense)
    uExpense.textContent =  sumUSDExpense()
    usdExpense.appendChild(uExpense)
    eExpense.textContent = sumEURExpense()
    eurExpense.appendChild(eExpense)

    //set display of expense totals
    expenseElement.appendChild(gbpExpense)
    expenseElement.appendChild(usdExpense)
    expenseElement.appendChild(eurExpense)
    expenseElement.classList.add('list-item__totals')

    return expenseElement
}

// render Expenses 
const renderExpenses = () => {
    const expensesEl = document.querySelector('#expenses')
    const totalsEl = document.querySelector('#totals')
    const filters = getFilters()
    const expenses = sortExpenses(filters.sortBy)  
    const filterdExpenses = expenses.filter((expense) => expense.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    expensesEl.innerHTML = ''
    totalsEl.innerHTML = ''

    if (filterdExpenses.length > 0) {
        filterdExpenses.forEach((expense) => {
            const expenseElement = generateExpenseDOM(expense)
            expensesEl.appendChild(expenseElement)
        })
        const totalsElement = generateTotalsDOM()
        totalsEl.appendChild(totalsElement)
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
    const currencyElement = document.querySelector('#expense-currency')
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

    const optionToFind = expense.currency
    currencyElement.selectedIndex = [...currencyElement.options].findIndex (option => option.text === optionToFind)

    incomeElement.checked = expense.income
    lastUpdated.textContent = updatedTime(expense.updatedAt)
}



export { updatedTime, initialiseEditPage, renderExpenses, generateTotalsDOM}