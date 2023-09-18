import { Nectar } from "@wasd3rplay/nectar-sdk";

const nectar = new Nectar();

const main = async (): Promise<void> => {
  const market = (await nectar.getExchangeInfo())[0];

  const priceRemainVolumes = await nectar.getMarketPriceRemainVolumes(
    market.symbol
  );
  console.debug("Market Volumes per Price: ", priceRemainVolumes);
  console.debug("Remain Bid (BUY) volume per Price", priceRemainVolumes.bids);
  console.debug("Remain Ask (SELL) volume per Price", priceRemainVolumes.asks);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
