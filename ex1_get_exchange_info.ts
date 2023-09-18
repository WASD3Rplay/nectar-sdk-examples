import { Nectar } from "@wasd3rplay/nectar-sdk";

const main = async (): Promise<void> => {
  const nectar = new Nectar();

  const marketList = await nectar.getExchangeInfo();
  console.debug("Market List: ", marketList);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
