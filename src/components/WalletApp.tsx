import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract, BigNumberish } from 'ethers'
import {
    HeaderMenu,
    Header,
    Blockie,
    Address,
    Mana,
    Center,
    Field,
    Button,
    Segment,
    Loader
} from 'decentraland-ui'

import ERC20 from "abi/ERC20.json"

export default function WalletApp() {
    const [ tokenContract, setTokenContract ] = React.useState<Contract>()
    const [ tokenBalance, setTokenBalance ] = React.useState<BigNumberish>()
    const { account, library, chainId } = useWeb3React()

    React.useEffect(() => {
        if (!tokenContract) {
            let contract = new Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", ERC20.abi, library)
            setTokenContract(contract)
            contract.balanceOf(account).then((balance: BigNumberish) => {
                console.log(balance)
                setTokenBalance(balance)
            })
        }
        
    })

    if (!account || !chainId || !tokenContract) {
        return <Loader />
    }

    return (
        <>
            <HeaderMenu>
                <HeaderMenu.Left>
                    <Blockie scale={3} seed={ account }>
                        <Address strong value={ account } />
                    </Blockie>
                    
                </HeaderMenu.Left>
                <HeaderMenu.Right>
                    <strong>
                        Connected to chain { chainId }
                    </strong>
                </HeaderMenu.Right>
            </HeaderMenu>
            <Center>
                        
                <Segment>
                    <Header>
                        Your token balance
                    </Header>
                    <Mana>
                        {tokenBalance?
                            tokenBalance.toString():
                            <Loader active size="mini" />
                        }
                    </Mana>
                    <Header>
                        Send funds
                    </Header>
                    <Field label="address" type="address" />
                    <Field label="amount" type="number" />
                    <Button primary onClick={() => alert("Send")}>
                        Send funds!
                    </Button>
                </Segment>
            </Center>
        </>

    )
}