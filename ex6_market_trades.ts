import { Nectar, MarketTrade } from "@wasd3rplay/nectar-sdk";

const nectar = new Nectar();

const fetchAllTrades = async (symbol: string): Promise<MarketTrade[]> => {
  let openOrders: MarketTrade[] = [];

  let page = 1;
  while (true) {
    const resp = await nectar.getMarketTrades(symbol, page);
    openOrders = openOrders.concat(resp.results);

    if (!resp.next) {
      break;
    }
    page++;
  }

  return openOrders;
};

const main = async (): Promise<void> => {
  const market = (await nectar.getExchangeInfo())[0];

  const trades = await fetchAllTrades(market.symbol);
  console.debug("Market Trades: ", trades);
  console.debug("Number of data:", trades.length);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
