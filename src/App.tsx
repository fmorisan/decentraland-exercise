import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import { Navbar, Page, Footer, Center, Segment } from 'decentraland-ui'


import logo from './logo.svg';
import './App.css';
import WalletApp from "./components/WalletApp"
import ConnectCard from "./components/ConnectCard"


function App() {
  const { active } = useWeb3React()

  const app = (
    <>
      <WalletApp />
    </>
  )

  const connect = (
    <ConnectCard />
  )

  return (
    <div className="App">
      <Navbar></Navbar>
      <Page>
              {
                active?
                  app : connect
              }
      </Page>
      <Footer></Footer>
    </div>
  );
}

export default App;
