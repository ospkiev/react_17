export function getPageCount(totalCount, limit) {
    return Math.ceil(totalCount / limit)
}

export function getPagesArray(totalPages) {
    let pagesArray = []
    for (let i = 0; i < totalPages; i++) {
        pagesArray.push(i + 1)
    }
    return pagesArray
}