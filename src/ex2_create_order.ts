import { Nectar, OrderType, UserOrder } from "@wasd3rplay/nectar-sdk";
import { Wallet } from "ethers";

const nectar = new Nectar();

const fetchAllOpenOrders = async (symbol: string): Promise<UserOrder[]> => {
  let openOrders: UserOrder[] = [];

  let page = 1;
  while (true) {
    const resp = await nectar.getOpenOrders({ page, symbol });
    openOrders = openOrders.concat(resp.results);

    if (!resp.next) {
      break;
    }
    page++;
  }

  return openOrders;
};

const main = async (): Promise<void> => {
  const market = (await nectar.getExchangeInfo())[1];
  console.debug("Market: ", market);

  const marketSymbol = market.symbol;

  // BUY order
  const buyerWallet = Wallet.createRandom();
  const buyOrderID = await nectar.createLimitOrder({
    symbol: marketSymbol,
    orderType: OrderType.BUY_LIMIT,
    price: "1000",
    requestAmount: "0.1",
    signer: buyerWallet,
  });
  console.debug("BUY order: ", buyOrderID, " BY ", buyerWallet.address);

  // SELL order
  const sellerWallet = Wallet.createRandom();
  const sellOrderID = await nectar.createLimitOrder({
    symbol: marketSymbol,
    orderType: OrderType.SELL_LIMIT,
    price: "1100",
    requestAmount: "0.5",
    signer: sellerWallet,
  });
  console.debug("SELL order: ", sellOrderID, " BY ", sellerWallet.address);

  // All open orders
  let openOrders = await fetchAllOpenOrders(marketSymbol);
  console.debug("Open orders: ", openOrders);

  // Cancel BUY order
  await nectar.cancelOrder({ orderId: buyOrderID });
  openOrders = await fetchAllOpenOrders(marketSymbol);
  console.debug("Open orders: ", openOrders);

  // Cancel SELL order
  await nectar.cancelOrder({ orderId: sellOrderID });
  openOrders = await fetchAllOpenOrders(marketSymbol);
  console.debug("Open orders: ", openOrders);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
