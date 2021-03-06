
import './App.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie } from '@fortawesome/free-solid-svg-icons';




function Mainpage() {


    /*
        const [watchListIds, setWatchListIds] = useState([
            { wid: 3, assetname: 'Polkadot' },
            { wid: 4, assetname: 'Solana' },
            { wid: 5, assetname: 'Shiba Inu' },
            { wid: 6, assetname: 'Floki Inu (BEP-20)' },
            { wid: 7, assetname: 'Luna' },
            { wid: 8, assetname: 'NFT Champions' },
            { wid: 9, assetname: 'Loopring' },
            { wid: 10, assetname: 'MetaWars' },
            { wid: 11, assetname: 'Tron (BEP-20)' },
            { wid: 12, assetname: 'VeChain Thor' },
        ])
        */



    const [pfValue, setPFValue] = useState("") //BALANCE
    const [names, setNames] = useState([]) //
    const [currentprice, setCurrentPrice] = useState([])
    const [qty, setQty] = useState([])
    const [value, setValue] = useState([])
    const [bitcoinPrice, setBitcoinPrice] = useState("")
    const [dollaSign, setDollaSign] = useState("")
    const [updateTime, setUpdate] = useState("")
    const [sNames, setSnames] = useState([])
    const [sValues, setSvalues] = useState([])
    const [sPrices, setPrices] = useState([])
    const [sQty, setSqty] = useState([])
    const [dBal, setDbal] = useState("Loading Data..")
    const [dStockbal, setDstockbal] = useState("")
    const [dCryptobal, setDcryptobal] = useState("")

    let portBal = 0
    let int = 0;
    let date = new Date();
    let stockTotal = 0

    useEffect(() => {

        //STOCK API REQUEST
        async function stockRequest() {
            const stockUrl = "https://finnhub.io/api/v1/quote?symbol="
            const token = 'c6jdhqiad3ieecon3mo0'
            const stocks = [
                { ticker: "AAPL", qty: 48, broker: "Robinhood" },
                { ticker: "FB", qty: 20, broker: "Robinhood" },
                { ticker: "PYPL", qty: 5, broker: "Robinhood" },
                { ticker: "AMC", qty: 201, broker: "Robinhood" },
                { ticker: "TSLA", qty: 10, broker: "Etrade" },
                { ticker: "SQ", qty: 100, broker: "Etrade" },
                { ticker: "WKSP", qty: 50, broker: "Etrade" },
                { ticker: "AMC", qty: 200, broker: "Etrade" },
                { ticker: "UBER", qty: 7, broker: "Etrade-2" },
                { ticker: "AMC", qty: 6, broker: "Webull" }
            ]
            let stockNames = []
            let stockQty = []
            let stockBrokers = []
            let stockValues = []
            let stockPrices = []


            //CREATE STOCK ARRAY
            for (let r = 0; r <stocks.length; r++){
                stockNames.push(stocks[r]["ticker"])
                stockQty.push(stocks[r]["qty"])
                stockBrokers.push(stocks[r]["broker"])
            }

            const start = () => {
                setTimeout(() => {
                    collectData();
                }, 2000);
            }
            start();

            async function collectData() {
                try {
                    let apiRes = await fetch(stockUrl + stocks[int]["ticker"] + "&token=" + token)
                    let resData = await apiRes.json()
                    console.log(`${stocks[int]["ticker"]} RESPONSE DATA\n================================`)
                    console.log(resData)
                    stockPrices.push(parseFloat(resData.c))
                    int++

                    if (int < stocks.length) {
                        start();
                    }

                    else if (int === stocks.length) {
                        console.log(`\n\nSTOCK HOLDING REPORT UPDATE: \n${date.toLocaleString()}\n`)
                        console.log(`LATEST PRICES`);
                        console.log(`===============================`)
                        for (let n = 0; n < stocks.length; n++) {
                            console.log(`${stocks[n]["ticker"]}: $${stockPrices[n]}`);
                        }
                        console.log(`\nCURRENT VALUE`);
                        console.log(`===============================`);
                        for (let i = 0; i < stocks.length; i++) {
                            console.log(`${stocks[i]["ticker"]}: $${(stocks[i]["qty"] * stockPrices[i]).toFixed(2)}`);
                            let subTotal = parseFloat(stocks[i]["qty"] * stockPrices[i])
                            stockValues.push(subTotal.toFixed(2))
                            setSvalues(subTotal.toFixed(2))
                            stockTotal = subTotal + stockTotal
                        }

                        //LOAD STATE ARRAYS
                        setSvalues(stockValues)
                        setSnames(stockNames)
                        setPrices(stockPrices)
                        setSqty(stockQty)

                        console.log(`===============================`);
                        console.log(`PORTFOLIO VALUE: $${stockTotal.toFixed(2)}`)
                        let pBal = stockTotal.toFixed(2)
                        portBal = parseFloat(pBal)
                        console.log(`portBal: ${portBal}`)
                        //setStocktotalgv(portBal)

                        //resetApp();
                        stockPrices = []
                        int = 0;
                        date = new Date();
                        stockTotal = 0;
                        await request();
                    }
                }
                catch (error) {
                    console.log(`(((STOCK DATA ERROR)))`)
                    console.log(error)
                    stockPrices = []
                    stockTotal = 0;
                    int = 0;
                }

            }

        }
        stockRequest();

        //API REQUEST
        async function request() {
            const proxy = "https://cryptalgo-proxy.herokuapp.com/"
            const nomics = "https://api.nomics.com/v1/currencies/ticker?key=23ea3d57a9af9203f012a0c7e849afc9"
            const userIds = [
                { uid: 1, ticker: "DOGEDASH", asset: 'Doge Dash', qty: 393741.267, price: 0 },
                { uid: 10, ticker: "DOT", asset: 'Polkadot', qty: 26.24000000, price: 0 },
                { uid: 2, ticker: "SOL", asset: 'Solana', qty: 5.032000000, price: 0 },
                { uid: 8, ticker: "ETH", asset: 'Ethereum', qty: 1.01440355, price: 0 },
                { uid: 9, ticker: "ADA", asset: 'Cardano', qty: 211.1, price: 0 },
                { uid: 3, ticker: "FLOKI", asset: 'Floki Inu (ERC-20)', qty: 1087451.205, price: 0 },
                { uid: 6, ticker: "MATIC", asset: 'Polygon', qty: 100.1, price: 0 },
                { uid: 0, ticker: "SUPER2", asset: 'SuperFarm', qty: 111.666, price: 0 },
                { uid: 2, ticker: "RPG2", asset: 'Revolve Games', qty: 111.353, price: 0 },
                { uid: 4, ticker: "ALU", asset: 'Altura', qty: 539.918, price: 0 },
                { uid: 5, ticker: "BNB", asset: 'Binance Coin', qty: 0.0087, price: 0 },
                { uid: 11, ticker: "SAFEMOON", asset: 'SafeMoon', qty: 36734655, price: 0 },
                { uid: 7, ticker: "USDC", asset: 'USD Coin', qty: 12.420261, price: 0 }]


            console.log(`Inside Async Function\nINITIATING API FETCH REQUEST..`)
            try {
                let response = await fetch(proxy + nomics)
                let res = await response.json()
                console.log(`FETCH REQUEST SUCCESSFULL...\n\nNOMICS CRYPTO API DATA\n====================`)
                console.log(`API RESPONSE/HEADER DATA`)
                console.log(response)
                console.log(`API FULL JSON DATA`)
                console.log(`Variable: res\n`)
                console.log(res) //DISPLAY RES IN CONSLOLE

                //FIND TSYMBOL ARRAY DATA
                let apiData = res.filter(function (id) {
                    for (let int = 0; int < userIds.length; int++) {
                        if (id.id === userIds[int]["ticker"]) {
                            return true
                        }
                    }
                })
                //GETS BTC Bitcoin Price
                let btcData = res.filter(function (id) {
                    if (id.id === "BTC") {
                        return true
                    }
                })
                let btcPrice = parseFloat(btcData[0]["price"]).toFixed(2)
                let btcDisplay = "BTC Price: $" + btcPrice
                console.log(btcDisplay)
                btcData = []; //CLEARS BTC OBJECT
                response = [];//CLEAR API INFO
                res = []; //CLEAR API INFO OBJECT

                //LOAD INDIVIDUAL VARIABLE ARRAYS TO ORGANIZE DATA
                let symbolPrices = [] //CURRENT PRICE
                let symbolNames = [] //TICKER SYMBOL
                let symbolQty = []
                for (let u = 0; u < apiData.length; u++) {
                    symbolPrices.push(parseFloat(apiData[u]["price"]))
                    symbolNames.push(apiData[u]["id"])
                    symbolQty.push(userIds[u]["qty"])
                }
                console.log(symbolNames)
                console.log(symbolPrices)
                //FIND INDEXES OF CORRESPONDING USER HOLDINGS
                let idxs = []
                for (let b = 0; b < apiData.length; b++) {
                    idxs.push(symbolNames.indexOf(userIds[b]["ticker"]))
                }

                //ORGANIZE VARIABLES IN NEW ARRAYS
                let reorderNames = []
                let reorderPrices = []
                let reorderQty = []
                let reorderAsset = []
                for (let r = 0; r < apiData.length; r++) {
                    reorderNames.push(symbolNames[idxs[r]])
                    reorderPrices.push(symbolPrices[idxs[r]])
                    reorderQty.push(userIds[r]["qty"])
                    reorderAsset.push(userIds[r]["asset"])
                }
                //CALCULATE AND LOAD CRYPTO UNIT VALUES
                let reorderValues = []
                for (let c = 0; c < apiData.length; c++) {
                    let unitValue = parseFloat((reorderPrices[c] * reorderQty[c]).toFixed(2))
                    reorderValues.push(unitValue)
                }

                //CALCULATE PORTFOLIO BALANCE
                let portfolioBal = reorderValues.reduce((a, b) => a + b, 0)
                let total = portfolioBal.toFixed(2)

                //CONSOLE VARIABLE CHECK
                console.log(`API SELECTED DATA:`)//ARRAY/OBJECT OF USER SELECTED ASSETS
                console.log(apiData)
                console.log(`TICKER SYMBOLS`)
                console.log(symbolNames)//ARRAY OF USERDEFINED SYMBOL NAMES
                console.log(`TICKER SYMBOL PRICES`)
                console.log(symbolPrices)//ARRAY OF ASSETS CURRENT UNIT PRICE
                console.log(`INDEXES OF CORRESPONDING USER HOLDINGS`)
                console.log(idxs)

                //ORGANIZED VARIABLES CONSOLE CHECK
                console.log(`ORGANIZED VARIABLES\n====================`)
                console.log(`ORGANIZED TICKER LIST ORDER`)
                console.log(reorderNames)
                console.log(`ORGANIZED PRICE LIST ORDER`)
                console.log(reorderPrices)
                console.log(`ORGANIZED QTY LIST ORDER`)
                console.log(reorderQty)
                console.log(`ORGANIZED ASSETNAME LIST ORDER`)
                console.log(reorderAsset)
                console.log(`ORGANIZED UNIT VALUES LIST ORDER`)
                console.log(reorderValues)
                console.log(`CRYPTO PORFOLIO BALANCE`)
                console.log(`$${total}`)
                console.log(`STOCK PORTFOLIO BALANCE`)
                console.log(`$${portBal}`)
                console.log(`PORTFOLIO TOTAL NET VALUE`)
                let portfolioBalance = parseFloat(total) + portBal
                console.log(`$${portfolioBalance.toFixed(2)}`)
                let displayBal = portfolioBalance.toFixed(2)
                //UPDATE STATE IN UI VARIABLES
                apiData = [{}]//CLEAR API OBJECT DATA
                let time = Date.now()
                let date = new Date(time)
                console.log(`Date: ${date.toLocaleTimeString()}`)
                let timeUpdate = date.toLocaleString()
                setUpdate(timeUpdate)
                setNames(reorderNames)
                setQty(reorderQty)
                setCurrentPrice(reorderPrices)
                setValue(reorderValues)
                setBitcoinPrice(btcDisplay)
                setDollaSign("$")
                setPFValue("Crypto: $" + total)
                setDbal(displayBal)
                setDstockbal("Stocks: $" + portBal + " |")
                setDcryptobal(total)
                loadDisplay();

            }
            catch (error) {
                console.log(`CRYPTO DATA ERROR`)
                console.log(error)
                loadDisplay();
            }
        }

        //REFRESH AND RELOAD
        async function loadDisplay() {
            setTimeout(() => {
                stockRequest();
            }, 240000);
        }

    }, []) // [] STOPS REACT FROM MAKING MULTIPLE REQUESTS ON LOAD



    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    {' '}
                    <FontAwesomeIcon icon={faChartPie} />
                    {' '} My Asset Portfolio
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {bitcoinPrice}
                        {' '}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
            <div className="Logo-header">
                <FontAwesomeIcon size="10x" color="#282c34" icon={faChartPie} />
            </div>
            <div className="Main-header">
                <h1 className="Title-text">PORTFOLIO VALUE:</h1>
                <h1 className="Title-text">{dollaSign}{dBal}</h1>
                <p className="small-display">{dStockbal}  {pfValue}</p>
            </div>
            <p className="update-font">Last Updated: {updateTime}</p>
            <div className="div-line"></div>
            <Container>
                <Row>
                    <Col lg={4} md={12} sm={12} >
                        <h2>CRYPTO VALUES</h2>
                        <Table striped bordered hover variant="dark" size="sm">
                            <thead>
                                <tr>
                                    <th><FontAwesomeIcon icon={faChartPie} /></th>
                                    <th>CRYPTO</th>
                                    <th>VALUE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>{names[0]}</td>
                                    <td>{dollaSign}{value[0]}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>{names[1]}</td>
                                    <td>{dollaSign}{value[1]}</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>{names[2]}</td>
                                    <td>{dollaSign}{value[2]}</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>{names[3]}</td>
                                    <td>{dollaSign}{value[3]}</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>{names[4]}</td>
                                    <td>{dollaSign}{value[4]}</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>{names[5]}</td>
                                    <td>{dollaSign}{value[5]}</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>{names[6]}</td>
                                    <td>{dollaSign}{value[6]}</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>{names[7]}</td>
                                    <td>{dollaSign}{value[7]}</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>{names[8]}</td>
                                    <td>{dollaSign}{value[8]}</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>{names[9]}</td>
                                    <td>{dollaSign}{value[9]}</td>
                                </tr>
                                <tr>
                                    <td>11</td>
                                    <td>{names[10]}</td>
                                    <td>{dollaSign}{value[10]}</td>
                                </tr>
                                <tr>
                                    <td>12</td>
                                    <td>{names[11]}</td>
                                    <td>{dollaSign}{value[11]}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg={4} md={12} sm={12}>
                        <h2>CRYPTO PRICES</h2>
                        <Table striped bordered hover variant="dark" size="sm">
                            <thead>
                                <tr>
                                    <th><FontAwesomeIcon icon={faChartPie} /></th>
                                    <th>CRYPTO</th>
                                    <th>PRICE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>{names[0]}</td>
                                    <td>{dollaSign}{currentprice[0]}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>{names[1]}</td>
                                    <td>{dollaSign}{currentprice[1]}</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>{names[2]}</td>
                                    <td>{dollaSign}{currentprice[2]}</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>{names[3]}</td>
                                    <td>{dollaSign}{currentprice[3]}</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>{names[4]}</td>
                                    <td>{dollaSign}{currentprice[4]}</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>{names[5]}</td>
                                    <td>{dollaSign}{currentprice[5]}</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>{names[6]}</td>
                                    <td>{dollaSign}{currentprice[6]}</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>{names[7]}</td>
                                    <td>{dollaSign}{currentprice[7]}</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>{names[8]}</td>
                                    <td>{dollaSign}{currentprice[8]}</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>{names[9]}</td>
                                    <td>{dollaSign}{currentprice[9]}</td>
                                </tr>
                                <tr>
                                    <td>11</td>
                                    <td>{names[10]}</td>
                                    <td>{dollaSign}{currentprice[10]}</td>
                                </tr>
                                <tr>
                                    <td>12</td>
                                    <td>{names[11]}</td>
                                    <td>{dollaSign}{currentprice[11]}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg={4} md={12} sm={12}>
                        <h2>CRYPTO HOLDINGS</h2>
                        <Table striped bordered hover variant="dark" size="sm">
                            <thead>
                                <tr>
                                    <th><FontAwesomeIcon icon={faChartPie} /></th>
                                    <th>CRYPTO</th>
                                    <th>QUANTITY</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>{names[0]}</td>
                                    <td>{qty[0]}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>{names[1]}</td>
                                    <td>{qty[1]}</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>{names[2]}</td>
                                    <td>{qty[2]}</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>{names[3]}</td>
                                    <td>{qty[3]}</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>{names[4]}</td>
                                    <td>{qty[4]}</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>{names[5]}</td>
                                    <td>{qty[5]}</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>{names[6]}</td>
                                    <td>{qty[6]}</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>{names[7]}</td>
                                    <td>{qty[7]}</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>{names[8]}</td>
                                    <td>{qty[8]}</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>{names[9]}</td>
                                    <td>{qty[9]}</td>
                                </tr>
                                <tr>
                                    <td>11</td>
                                    <td>{names[10]}</td>
                                    <td>{qty[10]}</td>
                                </tr>
                                <tr>
                                    <td>12</td>
                                    <td>{names[11]}</td>
                                    <td>{qty[11]}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} md={12} sm={12} >
                    <h2>STOCK VALUES</h2>
                        <Table striped bordered hover variant="dark" size="sm">
                            <thead>
                                <tr>
                                    <th><FontAwesomeIcon icon={faChartPie} /></th>
                                    <th>STOCKS</th>
                                    <th>VALUE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>{sNames[0]}</td>
                                    <td>{dollaSign}{sValues[0]}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>{sNames[1]}</td>
                                    <td>{dollaSign}{sValues[1]}</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>{sNames[2]}</td>
                                    <td>{dollaSign}{sValues[2]}</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>{sNames[3]}</td>
                                    <td>{dollaSign}{sValues[3]}</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>{sNames[4]}</td>
                                    <td>{dollaSign}{sValues[4]}</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>{sNames[5]}</td>
                                    <td>{dollaSign}{sValues[5]}</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>{sNames[6]}</td>
                                    <td>{dollaSign}{sValues[6]}</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>{sNames[7]}</td>
                                    <td>{dollaSign}{sValues[7]}</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>{sNames[8]}</td>
                                    <td>{dollaSign}{sValues[8]}</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>{sNames[9]}</td>
                                    <td>{dollaSign}{sValues[9]}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg={4} md={12} sm={12} >
                    <h2>STOCK PRICES</h2>
                        <Table striped bordered hover variant="dark" size="sm">
                            <thead>
                                <tr>
                                    <th><FontAwesomeIcon icon={faChartPie} /></th>
                                    <th>STOCKS</th>
                                    <th>PRICE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>{sNames[0]}</td>
                                    <td>{dollaSign}{sPrices[0]}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>{sNames[1]}</td>
                                    <td>{dollaSign}{sPrices[1]}</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>{sNames[2]}</td>
                                    <td>{dollaSign}{sPrices[2]}</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>{sNames[3]}</td>
                                    <td>{dollaSign}{sPrices[3]}</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>{sNames[4]}</td>
                                    <td>{dollaSign}{sPrices[4]}</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>{sNames[5]}</td>
                                    <td>{dollaSign}{sPrices[5]}</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>{sNames[6]}</td>
                                    <td>{dollaSign}{sPrices[6]}</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>{sNames[7]}</td>
                                    <td>{dollaSign}{sPrices[7]}</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>{sNames[8]}</td>
                                    <td>{dollaSign}{sPrices[8]}</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>{sNames[9]}</td>
                                    <td>{dollaSign}{sPrices[9]}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg={4} md={12} sm={12} >
                    <h2>STOCK HOLDINGS</h2>
                        <Table striped bordered hover variant="dark" size="sm">
                            <thead>
                                <tr>
                                    <th><FontAwesomeIcon icon={faChartPie} /></th>
                                    <th>STOCKS</th>
                                    <th>QUANTITY</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>{sNames[0]}</td>
                                    <td>{sQty[0]}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>{sNames[1]}</td>
                                    <td>{sQty[1]}</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>{sNames[2]}</td>
                                    <td>{sQty[2]}</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>{sNames[3]}</td>
                                    <td>{sQty[3]}</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>{sNames[4]}</td>
                                    <td>{sQty[4]}</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>{sNames[5]}</td>
                                    <td>{sQty[5]}</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>{sNames[6]}</td>
                                    <td>{sQty[6]}</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>{sNames[7]}</td>
                                    <td>{sQty[7]}</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>{sNames[8]}</td>
                                    <td>{sQty[8]}</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>{sNames[9]}</td>
                                    <td>{sQty[9]}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default Mainpage;
