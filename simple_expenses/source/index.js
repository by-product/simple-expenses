import { createExpense } from './expenses.js'
import { renderExpenses } from './views.js'
import { setFilters } from './filters.js'

renderExpenses()

document.querySelector('#add-expense').addEventListener('click', (e) => {
    const id = createExpense()

    location.assign(`/edit.html#${id}`)
    console.log(expenses)

})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderExpenses()
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderExpenses()
})