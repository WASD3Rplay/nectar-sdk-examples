import { Nectar } from "@wasd3rplay/nectar-sdk";

const main = async (): Promise<void> => {
  const nectar = new Nectar();

  const market = (await nectar.getExchangeInfo())[0];
  const trades = await nectar.getMarketTrades({ symbol: market.symbol });

  console.debug("Market Trades: ", trades);
  console.debug("Number of data:", trades.length);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
