import { Nectar } from "@wasd3rplay/nectar-sdk";
import { ethers } from "ethers";

const nectar = new Nectar();

const main = async (): Promise<void> => {
  const market = (await nectar.getExchangeInfo())[3];
  const provider = new ethers.providers.JsonRpcProvider(market.chain.rpcurl);
  const wallet = nectar.userWallet?.connect(provider);
  const balance = ethers.utils.formatEther(
    (await wallet?.getBalance()) ?? BigInt(0)
  );
  console.debug("User balance:", balance, "ETH on", market.symbol);

  let transferResult;
  // native ticker
  // From funding wallet to trading wallet
  transferResult = await nectar.transferTokenToTradingWallet({
    ticker: "ETH_ETH",
    requestAmount: "0.001", // ETH
    symbol: "ETH_ETH:USDT_ETH",
    signer: wallet,
  });
  console.debug("Transfer (funding -> trading) ETH result:", transferResult);

  // native ticker
  // From trading wallet to funding wallet
  transferResult = await nectar.transferTokenToFundingWallet({
    ticker: "ETH_ETH",
    requestAmount: "0.001", // ETH
    symbol: "ETH_ETH:USDT_ETH",
    signer: wallet,
  });
  console.debug("Transfer (trading -> funding) ETH result:", transferResult);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
