import { ICO, SpaceCoin, SpaceCoin__factory } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import hre from "hardhat";

async function main() {
  const networkName = hre.network.name;
  let spaceCoin: SpaceCoin;
  let ico: ICO;
  let deployer: SignerWithAddress;

  if (networkName === "localhost") {
    [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const spaceCoinContract = (await ethers.getContractFactory("SpaceCoin")) as SpaceCoin__factory;
    const icoContract = await ethers.getContractFactory("ICO");
    spaceCoin = await spaceCoinContract.deploy(deployer.address, deployer.address);
    ico = await icoContract.deploy(deployer.address, spaceCoin.address, [deployer.address]);
    await spaceCoin.transfer(ico.address, ethers.utils.parseEther("150000")); // transfer 150000 supply to ico contract
    await spaceCoin.transfer(deployer.address, ethers.utils.parseEther("350000"));
    ico.addToWhitelist(["0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"]);
    console.log("Spacecoin deployed to: ", spaceCoin.address);
    console.log("ICO deployed to: ", ico.address);
  }

  if (networkName === "rinkeby") {
    [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const spaceCoinContract = (await ethers.getContractFactory("SpaceCoin")) as SpaceCoin__factory;
    const icoContract = await ethers.getContractFactory("ICO");
    spaceCoin = await spaceCoinContract.deploy(deployer.address, deployer.address);
    ico = await icoContract.deploy(deployer.address, spaceCoin.address, [deployer.address]);
    await spaceCoin.transfer(ico.address, ethers.utils.parseEther("150000")); // transfer 150000 supply to ico contract
    await spaceCoin.transfer(deployer.address, ethers.utils.parseEther("350000")); // transfer remaining to treasury/deployer
    ico.addToWhitelist(["0x702822a41e618eE9dBD339E2edfeD4CcB7eF0651"]);
    console.log("Spacecoin deployed to: ", spaceCoin.address);
    console.log("ICO deployed to: ", ico.address);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
