import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ethers } from "ethers";

import IcoJSON from "./artifacts/contracts/ICO.sol/ICO.json";
import SpaceCoinJSON from "./artifacts/contracts/SpaceCoin.sol/SpaceCoin.json";

const spaceCoinAddr = "0x9DF3CbcC4a9EaF9191381d60439A5012d28a3a62"; // rinkeby
const icoAddr = "0x85310E3eF4d32904689b8144D8A81D3E2A746D7F"; // rinkeby

function App() {
  const MAX_SPACE_COIN = 30000;
  const [spaceTokenLeft, setSpaceToken] = useState("");
  const [myBalance, setBalance] = useState("");
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({});

  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const getTotalRaised = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(icoAddr, IcoJSON.abi, provider);
      try {
        const data = await contract.totalRaised();
        setSpaceToken(ethers.utils.formatUnits(data, 18));
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  const getUserBalance = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        spaceCoinAddr,
        SpaceCoinJSON.abi,
        provider
      );
      try {
        const data = await contract.balanceOf(window.ethereum.selectedAddress);
        setBalance(ethers.utils.formatUnits(data, 18));
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  useEffect(() => {
    const fetchTokenData = async () => {
      await getTotalRaised();
      await getUserBalance();
    };
    fetchTokenData();
  }, []);

  const buyToken = async (e) => {
    e.preventDefault();
    if (!value) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(icoAddr, IcoJSON.abi, signer);
      try {
        const transaction = await contract.buyTokens({
          value: ethers.utils.parseEther(value),
        });
        await transaction.wait();
        await getTotalRaised();
        await getUserBalance();
      } catch (err) {
        console.log("err", err.error);
        setErrors({
          ...errors,
          whitelist: err.error.data.originalError.message,
        });
      }
    }
  };

  const claimSpaceToken = async (e) => {
    e.preventDefault();
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(icoAddr, IcoJSON.abi, signer);

      try {
        const transaction = await contract.claimToken();
        await transaction.wait();
        await getTotalRaised();
        await getUserBalance();
      } catch (err) {
        console.log("err", err.error);
        setErrors({
          ...errors,
          claim: err.error.data.originalError.message,
        });
      }
    }
  };

  return (
    <Wrapper className="App">
      <form onSubmit={buyToken}>
        <div>SpaceCoin ICO</div>
        <div>
          SpaceCoin left to buy {MAX_SPACE_COIN - parseFloat(spaceTokenLeft)}
        </div>
        <div>My Balance: {myBalance} </div>
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input type="submit" value="Buy" />
        <Subheader>
          <button onClick={claimSpaceToken}>Claim SPCE Token</button>
        </Subheader>
      </form>
      <ErrorWrapper>
        <div>{errors.claim}</div>
      </ErrorWrapper>
      <ErrorWrapper>
        <div>{errors.whitelist}</div>
      </ErrorWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Subheader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ErrorWrapper = styled.div`
  color: red;
`;

export default App;
