function makeRequest(url) {
	return new Promise(function(resolve, reject) {
		let req = new XMLHttpRequest();
		req.open("GET", url)
		req.onload = resolve;
		req.onerror = reject;
		req.send();
	});
}

const urls = {
	"cb_btc": "https://api.pro.coinbase.com/products/BTC-USD/ticker",
	"cb_eth": "https://api.pro.coinbase.com/products/ETH-USD/ticker",
	"gm_btc": "https://api.gemini.com/v2/ticker/BTCUSD",
	"gm_eth": "https://api.gemini.com/v2/ticker/ETHUSD"
}

const promises = {};
const prices = {
	"btc": {
		"buy": {},
		"sell": {}
	}, 
	"eth": {
		"buy": {},
		"sell": {}
	}
};

function createSuccessCallback(exchange, asset) {
	return function (result) {
		const resp = JSON.parse(result.target.responseText);
		const buyPrice = resp["ask"];
		const sellPrice = resp["bid"];
		prices[asset]["buy"][exchange] = buyPrice;
		prices[asset]["sell"][exchange] = sellPrice;
		const buyElemId = exchange + "_" + asset + "_buy";
		const sellElemId = exchange + "_" + asset + "_sell";
		document.getElementById(buyElemId).innerHTML = "$" + buyPrice;
		document.getElementById(sellElemId).innerHTML = "$" + sellPrice;
	}
}

function recommend(result) {
	for (let asset in prices) {
		let buyPrices = prices[asset]["buy"];
		let sellPrices = prices[asset]["sell"];
		let minBuyExchange = null;
		let minBuyPrice = null;
		let maxSellExchange = null;
		let maxSellPrice = null;
		for (let exchange in buyPrices) {
			let price = buyPrices[exchange];
			if (minBuyPrice === null || price <  minBuyPrice) {
				minBuyExchange = exchange;
				minBuyPrice = price;
			}
		}
		for (let exchange in sellPrices) {
			let price = sellPrices[exchange];
			if (maxSellPrice === null || price > maxSellPrice) {
				maxSellExchange = exchange;
				maxSellPrice = price;
			}
		}
		const buyElemId = minBuyExchange + "_" + asset + "_buy";
		const sellElemId = maxSellExchange + "_" + asset + "_sell";
		document.getElementById(buyElemId).style.color = "#3D9970";
		document.getElementById(sellElemId).style.color = "#3D9970";
	}
}

for (let key in urls) {
	let splitKey = key.split("_");
	let exchange = splitKey[0];
	let asset = splitKey[1];
	let promise = makeRequest(urls[key]);
	let resolve = createSuccessCallback(exchange, asset);
	promises[key] = promise;
	promise.then(resolve, {});
}

Promise.all(Object.values(promises)).then(recommend, {});
