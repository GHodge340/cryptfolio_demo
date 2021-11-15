//GLOBAL PACKAGES
import fetch from 'node-fetch';

//GLOBAL VARIABLES
const key = '23ea3d57a9af9203f012a0c7e849afc9'
const nomics = `https://api.nomics.com/v1/currencies/ticker?key=${key}`
const nomicsUrl = `https://api.nomics.com/v1/currencies/ticker?key=${key}&ids=`
const nomicsUrl2 ='&interval=1d,30d&convert=USD&per-page=100&page=1'
const userIds = ['SuperFarm', 'Doge Dash', 'Revolve Games', 'Floki Inu (ERC-20)', 'Altura', 'Binance Coin', 'Polygon', 'USD Coin', 'Ethereum', 'Cardano', 'Polkadot', 'SafeMoon']
const holdingQty = [111.666, 106902.655, 111.353, 1087451.205, 539.918, 0.42681768, 100.1, 12.420261, 1.01440355, 211.1, 26.24000000, 36734655,]
const watchListIds = ['Bitcoin','Ethereum','Polkadot','Solana','Shiba Inu','Floki Inu (BEP-20)','Luna','NFT Champions']
let cryptoNames = []
let currentPrices = []
let idList = []
let tickers = []
let total = 0;
let c = 0
let c1 = 0
let c2 = 0
let c3 = 0
let x = 0
let i = 0

console.log(`\n\n 


██████ ████████ 
██         ██    
██         ██    
██         ██    
 ██████    ██    
                 
Crypto Tracker
By: @GTheCodeGuy\n                                                       
`)

console.log(`Compiling Crypto Data...`)
/*
//GATHERS A SPECIFIC TICKER DATA
async function test(){
    let callRes = await fetch(nomicsUrl + "FLOKI" + nomicsUrl2)
    let data = await callRes.json()
    console.log(`DATA CHECK FOR FLOKI\n====================`)
    console.log(data)

}
test()
*/
async function compileData(){
    //MAKES API REQUEST
    let response = await fetch(nomics)
    const res = await response.json()
    const indexesLocation = []
    await loadArrays()

    //LOADS CRYPTO DATA IN ARRAYS
    async function loadArrays(){
        for (c = 0; c < res.length; c++){
            idList.push(res[c]["id"])
            cryptoNames.push(res[c]["name"])
            currentPrices.push(parseFloat(res[c]["price"]))
            tickers.push(res[c]["symbol"])
        }
        //console.log(cryptoNames)
        await findCrypto()
    }
    //FINDS USER SELECTED IDS INDEX 
    async function findCrypto(){
        for(c1 = 0; c1 < userIds.length; c1++){
                //CREATES A LIST OF INDEXES
                let index = cryptoNames.indexOf(userIds[c1])
                indexesLocation.push(index) 
        }
            await printReport()      
    }

    //PRINT-DISPLAY CRYPTO HOLDINGS REPORT
    async function printReport(){
        //console.log(indexesLocation)
        console.log(`\nHOLDING PRICES\n===============`)
        for(c3 = 0; c3 < userIds.length; c3++){
            
            //console.log(`${userIds[c3]}`)
            console.log(`${tickers[indexesLocation[c3]]} - $${currentPrices[indexesLocation[c3]]}`)
            // console.log(`Name: ${userIds[c3]}\nTicker: ${tickers[indexesLocation[c3]]}\nPrices: $${currentPrices[indexesLocation[c3]]}\nValue: ${assetVal.toFixed(2)}`) 
        }
        console.log(`\nHOLDINGS VALUES\n===============`)
        for(let c4 = 0; c4 < userIds.length; c4++){
            let assetVal = holdingQty[c4] * currentPrices[indexesLocation[c4]]
            total = total + assetVal
            console.log(`${tickers[indexesLocation[c4]]} - $${assetVal.toFixed(2)}`) 
        }
        console.log(`===============\nPortfolio Value: $${total.toFixed(2)}`) 
        await watchList();
    }
}
compileData()

async function watchList(){
    
    const wlIndexes = []
    console.log(`\nWATCH LIST\n===============`)
    for(let c5 = 0; c5 < watchListIds.length; c5++){
        let wlindex = cryptoNames.indexOf(watchListIds[c5])
        wlIndexes.push(wlindex) 
    }

    for(let c6 = 0; c6 < watchListIds.length; c6++){
        console.log(`${tickers[wlIndexes[c6]]} - $${currentPrices[wlIndexes[c6]]}`)
    }
    await resetAlgo();
}

async function resetAlgo() {
    
    cryptoNames = []
    currentPrices = []
    idList = []
    tickers = []
    total = 0;
    c = 0
    c1 = 0
    c2 = 0
    c3 = 0
    x = 0
    i = 0

    setTimeout(() => {
        compileData();        
    }, 3000);
       

}



