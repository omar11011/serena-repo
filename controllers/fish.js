const Fish = () => {
    let result
    let num = Math.ceil(Math.random() * 100)
    let quantity = Math.ceil(Math.random() * 3)

    if(num < 70) result = ['Remoraid', quantity, quantity * 5]
    else if(num >= 70 && num < 80) result = ['Basculin', quantity, quantity * 15]
    else if(num >= 80 && num < 90) result = [['Goldeen', 'Magikarp'][Math.floor(Math.random() * 2)], quantity, quantity * 50]
    else if(num >= 90 && num < 99) result = [['Feebas', 'Carvanha'][Math.floor(Math.random() * 2)], quantity, quantity * 50]
    else if(num >= 99) result = ['Relicanth', quantity, quantity * 250]

    return result
}

module.exports = { Fish }