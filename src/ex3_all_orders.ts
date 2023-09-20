import { Nectar, UserOrder } from "@wasd3rplay/nectar-sdk";

const nectar = new Nectar();

const fetchAllOrders = async (symbol: string): Promise<UserOrder[]> => {
  let openOrders: UserOrder[] = [];

  let page = 1;
  while (true) {
    const resp = await nectar.getAllOrders({ page, symbol });
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

  // All orders
  let allOrders = await fetchAllOrders(market.symbol);
  console.debug("All orders: ", allOrders);
  console.debug("Number of orders: ", allOrders.length);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
