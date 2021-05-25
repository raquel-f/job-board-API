// helper functions

// set pagination (example: /skills?page=2 for results 11-20 since results per page are 10)
function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

// return empty array if no results
function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}
  
module.exports = {
    getOffset,
    emptyOrRows
}