const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

const setFilters = (updates) => {
    if (typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText
    }

    if (typeof updates.sortBy === 'string') {
        filters.sortBy = updates.sortBy
    }
}


const getFilters = () => filters



export { getFilters, setFilters }