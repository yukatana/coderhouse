//Coingecko API data fetching functions. Saved in their own file for organizational and reutilization purposes.

const url = "https://api.coingecko.com/api/v3/coins"

let VISprice
let PGXprice

function getPrices() {
    getVIS()
    getPGX()
}

//VIS data fetch:

const getVIS = async () =>{
    try {
        const res = await fetch(url+"/vigorus")
        const data = await res.json()
        VISprice = data.market_data.current_price.usd
        const headerVISprice = document.querySelector("#VISpriceUSD")
        headerVISprice.innerHTML = `$${VISprice.toFixed(4)}`
    }

    catch {
        VISprice = null
        const headerVISprice = document.querySelector("#VISpriceUSD")
        headerVISprice.innerHTML = "error"
    }
}

//PGX data fetch:

const getPGX = async () =>{
    try {
        const res = await fetch(url+"/pegaxy-stone")
        const data = await res.json()
        PGXprice = data.market_data.current_price.usd
        const headerPGXprice = document.querySelector("#PGXpriceUSD")
        headerPGXprice.innerHTML = `$${PGXprice.toFixed(4)}`
    }

    catch {
        PGXprice = null
        const headerPGXprice = document.querySelector("#PGXpriceUSD")
        headerPGXprice.innerHTML = "error"
    }
}
