import { Nectar } from "@wasd3rplay/nectar-sdk";
import { ERC20ContractCtrl, getEthProvider } from "@wasd3rplay/aadex-contract";

const nectar = new Nectar();

const main = async (): Promise<void> => {
  const market = (await nectar.getExchangeInfo())[3];
  const ethProvider = getEthProvider(market.chain.rpcurl);
  const wallet = nectar.userWallet?.connect(ethProvider.provider);

  if (!wallet) {
    throw new Error("Wallet should not be empty");
  }

  const erc20Contract = new ERC20ContractCtrl(
    ethProvider,
    market.quote_ticker_address,
    wallet
  );
  const balance = await erc20Contract.balanceOf(wallet.address);
  console.debug("User balance:", balance, "USDT on", market.symbol);

  let transferResult;
  // ERC20 ticker
  // From funding wallet to trading wallet
  transferResult = await nectar.transferTokenToTradingWallet({
    ticker: "USDT_ETH",
    requestAmount: "1000", // USDT
    symbol: "ETH_ETH:USDT_ETH",
    signer: wallet,
  });
  console.debug("Transfer (funding -> trading) USDT result:", transferResult);

  // ERC20 ticker
  // From trading wallet to funding wallet
  transferResult = await nectar.transferTokenToFundingWallet({
    ticker: "USDT_ETH",
    requestAmount: "1000", // USDT
    symbol: "ETH_ETH:USDT_ETH",
    signer: wallet,
  });
  console.debug("Transfer (trading -> funding) USDT result:", transferResult);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
