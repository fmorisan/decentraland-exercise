import React from 'react'
import { Center, Button } from 'decentraland-ui'
import { useWeb3React } from '@web3-react/core'

import MetamaskConnector from '../connectors'

export default function ConnectCard() {
    const { activate } = useWeb3React()

    return (
        <Center>
            <Button primary onClick={() => activate(MetamaskConnector, () => {
                alert('Please connect to any supported network: Rinkeby or Localhost (1337)')
            })}>
                Connect
            </Button>
        </Center>
    )
}