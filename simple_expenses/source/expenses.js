import uuidv4 from 'uuid/v4'
import moment from 'moment'


//expenses array
let expenses = []

//sort notes by one of three ways
const sortExpenses = (sortBy) => {
    if (sortBy === 'byEdited') {
        return getExpenses().sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return getExpenses().sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabectial') {
        return getExpenses().sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return getExpenses()
    }
}

// save expenses to local storage
const saveExpenses = () => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
}

// check for and read existing saved data
const getSavedExpenses = () => {
    const expenseJSON = localStorage.getItem('expenses')

    try {
        return expenseJSON ? JSON.parse(expenseJSON) : []
    } catch (e) {
        return []
    }
    
}

//Add expense to array
const createExpense = () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()

    expenses.push({
        id: id,
        title: '',
        detail: '',
        ammount: 0,
        currency: '',
        createdAt: timestamp,
        updatedAt: timestamp,
        income: false
    })

    saveExpenses()

    return id
}

// remove note from array
const removeExpense = (id) => {
    const expenseIndex = getExpenses().findIndex((expense) => expense.id === id)
    
    if (expenseIndex > -1) {
        getExpenses().splice(expenseIndex, 1)
        saveExpenses()
    }
}

//Update Note
const updateExpense = (id, updates) => {
    const expense = getExpenses().find((expense) => expense.id === id)

    if (!expense) {
        return
    }

    if (typeof updates.title === 'string') {
        expense.title = updates.title
        expense.updatedAt = moment().valueOf()
    }

    if (typeof updates.detail === 'string') {
        expense.detail = updates.detail
        expense.updatedAt = moment().valueOf()
    }

    if (typeof Number(updates.ammount) === 'number' &&  updates.ammount !== undefined) {
        if (!expense.income) {
            expense.ammount = 0 - updates.ammount
        } else {
            expense.ammount = updates.ammount
        }
        
        expense.updatedAt = moment().valueOf()
    } 
    
    if (typeof updates.income === 'boolean') {
        expense.income = updates.income
        if (!expense.income) {
            expense.ammount = 0 - Math.abs(expense.ammount)
        } else {
            expense.ammount = Math.abs(expense.ammount)
        }
        
        expense.updatedAt = moment().valueOf()
    }

    saveExpenses()

    return expense
}

// get expenses
const getExpenses = () => expenses = getSavedExpenses()

export { saveExpenses, getExpenses, createExpense, sortExpenses, updateExpense, removeExpense }