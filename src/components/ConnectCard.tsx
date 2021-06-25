import React from 'react'
import { Center, Button } from 'decentraland-ui'
import { useWeb3React } from '@web3-react/core'

import MetamaskConnector from '../connectors'

export default function ConnectCard() {
    const [isWaiting, setIsWaiting] = React.useState<boolean>(false)
    const { activate } = useWeb3React()

    return (
        <Center>
            <Button primary disabled={isWaiting} onClick={() => {
                setIsWaiting(true)
                activate(MetamaskConnector, () => {
                    alert('Please connect to any supported network: Rinkeby or Localhost (1337)')
                }).finally(() => {
                    setIsWaiting(false)
                })
            }
            }>
                Connect
            </Button>
        </Center>
    )
}