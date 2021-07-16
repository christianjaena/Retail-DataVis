let button = document.querySelector('button')
button.addEventListener('click', async () => {
    let data = await getRetailData()
    data.forEach(item => {
        document.querySelector('p').innerHTML += `
        InvoiceNo: ${item.InvoiceNo}
        StockCode: ${item.StockCode}
        Description: ${item.Description}
        Quantity: ${item.Quantity}
        InvoiceDate: ${item.InvoiceDate}
        UnitPrice: ${item.UnitPrice}
        CustomerID: ${item.CustomerID}
        Country: ${item.Country}
        `
    })
})

const getRetailData = async () => {
    const response = await fetch('http://localhost:5000/retail')
    const json = await response.json()
    return json;
}