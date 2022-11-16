const { default: axios } = require("axios");
const { ethers } = require("ethers");
const { ABI } = require("./abi");
const express = require("express");
const app = express();
const main = async () => {
  const contractAddress = "0x64D1eE237c1633044b812F0a618a9171D7d2A803";

  const provider = new ethers.providers.WebSocketProvider(
    "wss://polygon-mumbai.g.alchemy.com/v2/KM1Kv-cqY7LlaPsoximQwOASxTzExuR5"
  );

  const contract = new ethers.Contract(contractAddress, ABI, provider);
  const _id = Math.random() * 100000000;
  contract.on("Liquidation", async (user, price, amountMATIC, amountDAI) => {
    const date = new Date();
    const time =
      date.getDate() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();

    const address = user;
    const sender = contractAddress;
    const info = {
      _id,
      address,
      sender,
      price,
      receiver: address,
      amountMATIC,
      amount: amountDAI,
      time,
      method: "Liquidate",
      token: "DAI",
    };
    const result = await axios.post(
      "https://liqui.onrender.com/api/ipfs",
      info
    );
    console.log(result);
    console.log(info);
  });
  // console.log(event);
};

main()
  .then()
  .catch((e) => console.log(e));

const port = 8081;
app.listen(port, console.log(`Listening on port ${port}...`));
