# Decentraland Challenge
This project is a solution to Decentraland's technical challenge. It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and makes use of
* [web3-react](https://github.com/NoahZinsmeister/web3-react)
* [ethers.js](https://github.com/ethers-io/ethers.js)
* [decentraland-ui](https://github.com/decentraland/ui/)
* [redux-toolkit](https://github.com/reduxjs/redux-toolkit)

This app allows an user to connect their wallet, view their balance of a dummy token, and send it to some other address.  
Please note that the [supplied token contract](https://github.com/decentraland/dummy-token) only supports a *subset* of the ERC20 specification, and so the following features have been elided:
* Transfer event listening (there is no Transfer event emitted)
* Decimals in token balances (there is no `decimals()` function to call)

A preview of this site is automatically deployed on Netlify. [See here](https://romantic-shannon-0edf6a.netlify.app/)

## Supported chains
The app supports clients connected both to
* Hardhat network (local, chainID 1337)
* Rinkeby Testnet (chainID 4)

To add more supported chains, edit the `src/contractAddresses.ts` file and the `src/connectors.ts` files, adding the chain ID you wish to support and the relevant contract's address.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.