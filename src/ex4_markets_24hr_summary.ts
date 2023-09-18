import { Nectar } from "@wasd3rplay/nectar-sdk";

const nectar = new Nectar();

const main = async (): Promise<void> => {
  // Markets' 24hr summary
  const summaries = await nectar.getMarkets24hrSummary();
  console.debug("Market 24hr summaries: ", summaries);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
