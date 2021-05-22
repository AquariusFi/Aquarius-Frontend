# Aquarius: Decentralized Borrowing Protocol

[![Frontend status](https://img.shields.io/uptimerobot/status/m784948796-056b56fd51c67d682c11bb24?label=Testnet&logo=nginx&logoColor=white)](https://devui.liquity.org) ![uptime](https://img.shields.io/uptimerobot/ratio/7/m784948796-056b56fd51c67d682c11bb24) [![Discord](https://img.shields.io/discord/700620821198143498?label=join%20chat&logo=discord&logoColor=white)](https://discord.gg/2up5U32) [![Docker Pulls](https://img.shields.io/docker/pulls/liquity/dev-frontend?label=dev-frontend%20pulls&logo=docker&logoColor=white)](https://hub.docker.com/r/liquity/dev-frontend)

Aquarius is a decentralized protocol that allows Ether holders to obtain maximum liquidity against
their collateral without paying interest. After locking up FTM as collateral in a smart contract and
creating an individual position called a "trove", the user can get instant liquidity by minting aUSD,
a USD-pegged stablecoin. Each trove is required to be collateralized at a minimum of 110%. Any
owner of aUSD can redeem their stablecoins for the underlying collateral at any time. The redemption
mechanism along with algorithmically adjusted fees guarantee a minimum stablecoin value of USD 1.

An unprecedented liquidation mechanism based on incentivized stability deposits and a redistribution
cycle from riskier to safer troves provides stability at a much lower collateral ratio than current
systems. Stability is maintained via economically-driven user interactions and arbitrage, rather
than by active governance or monetary interventions.

The protocol has built-in incentives that encourage both early adoption and the operation of
multiple front ends, enhancing decentralization.

## More information

Visit [aquarius.fi](http://aquarius.fi/) to find out more and join the discussion.

## About this repo

This repository hosts an early preview of the Aquarius codebase until we get ready to open it up completely. Development continues to take place in a private repository, from which this repository is derived using [git filter-repo](https://github.com/newren/git-filter-repo).

### Packages

These are the Aquarius components that have been made visible in this repo. They can be found under the `packages` directory.

| Package               | Description                                                                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| @liquity/dev-frontend | [Dev UI](https://devui.liquity.org): a bare-bones but functional React app used for interfacing with the smart contracts during development   |
| @liquity/lib-base     | Common interfaces and classes shared by the other `lib-` packages                                                                             |
| @liquity/lib-ethers   | [Ethers](https://github.com/ethers-io/ethers.js/)-based middleware that can read Aquarius state and send transactions                         |
| @liquity/lib-react    | Components and hooks that React-based apps can use to view Aquarius contract state                                                            |
| @liquity/lib-subgraph | [Apollo Client](https://github.com/apollographql/apollo-client)-based middleware backed by the Aquarius subgraph that can read Aquarius state |
| @liquity/providers    | Customized ethers.js Providers used by dev-frontend                                                                                           |
| @liquity/subgraph     | [Subgraph](https://thegraph.com) for querying Aquarius state as well as historical data like transaction history                              |

## Building Dev UI from source

If you want to customize the functionality or look of Dev UI, you'll need to build it yourself from source.

### Prerequisites

Node v12 and Yarn v1.

### Install dependencies and build libraries

Inside the root directory of the repo:

```
yarn
```

### Start Dev UI in development mode

```
yarn start-dev-frontend
```

This will start Dev UI in development mode on http://localhost:3000. The app will automatically be reloaded if you change a source file inside `packages/dev-frontend`.

If you make changes to a different package, it is recommended to rebuild the entire project with `yarn prepare` in the root directory of the repo.

### Build optimized Dev UI for production

```
cd packages/dev-frontend
yarn build
```

You'll find the output in `packages/dev-frontend/build`.

### Configuring your custom Dev UI

Your custom built Dev UI can be configured by putting a file named `config.json` inside the same directory as `index.html` built in the previous step. The format of this file is:

```
{
  "frontendTag": "0x2781fD154358b009abf6280db4Ec066FCC6cb435"
}
```
