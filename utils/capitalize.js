const Capitalize = keyword => {
    let word = keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase()
    return word
}

module.exports = { Capitalize }