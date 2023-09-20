import { Nectar, KLineInterval } from "@wasd3rplay/nectar-sdk";

const nectar = new Nectar();

const main = async (): Promise<void> => {
  const market = (await nectar.getExchangeInfo())[0];

  const now = new Date();
  const ago1Min = new Date(now.getTime() - 60 * 1000);

  const histories = await nectar.getMarketHistory({
    symbol: market.symbol,
    startTime: ago1Min,
    endTime: now,
    interval: KLineInterval.SECOND_1,
  });
  console.debug("Market History: ", histories);
  console.debug("Number of data:", histories.length);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
