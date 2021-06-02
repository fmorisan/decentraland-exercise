import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'decentraland-ui/lib/styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3ReactProvider } from '@web3-react/core'
import * as ethers from 'ethers'

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={(provider, connector) => new ethers.providers.Web3Provider(provider)}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
