# Specs

## Space Coin Token

500,000 max total supply
A 2% tax on every transfer that gets put into a treasury account
A flag that toggles this tax on/off, controllable by owner, initialized to false
The ICO Contract
Here's the spec:

The smart contract aims to raise 30,000 Ether by performing an ICO. The ICO should only be available to whitelisted private investors starting in Phase Seed with a maximum total private contribution limit of 15,000 Ether and an individual contribution limit of 1,500 Ether. The ICO should become available to the general public during Phase General, with a total contribution limit equal to 30,000 Ether, inclusive of funds raised from the private phase. During this phase, the individual contribution limit should be 1,000 Ether, until Phase Open, at which point the individual contribution limit should be removed. At that point, the ICO contract should immediately release ERC20-compatible tokens for all contributors at an exchange rate of 5 tokens to 1 Ether. The owner of the contract should have the ability to pause and resume fundraising at any time, as well as move a phase forwards (but not backwards) at will.

## Quickstart

```
`npm install` in root directory to add hardhat dependencies
cd into `frontend` and run `npm install` to add frontend dependencies
`npm start` to start frontend webapp
```

## Notes

- Frontend is connected to ICO smart contract deployed on rinkeby
- User's can input the amount of ETH they want to contribute to the ICO
- Once purchase is made, the amount is reserve in the user's account
- When ICO stage is set to open stage, user's can claim their SPCE tokens
- Trying to claim SPCE token while in the seed or general stage will throw an error

## Smart Contract Testing

```
npx hardhat test
npx hardhat coverage
REPORT_GAS=true npx hardhat test
```

## Deployed Smart Contracts on Rinkeby

```
SpaceCoin: https://rinkeby.etherscan.io/token/0x9DF3CbcC4a9EaF9191381d60439A5012d28a3a62
ICO: https://rinkeby.etherscan.io/address/0x85310E3eF4d32904689b8144D8A81D3E2A746D7F
```
