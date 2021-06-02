import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract, BigNumber } from 'ethers'
import {
    HeaderMenu,
    Header,
    Blockie,
    Address,
    Mana,
    Center,
    Segment,
    Loader
} from 'decentraland-ui'

import Token from "abi/Token.json"
import TransferForm from './TransferForm'
import getContractAddress from "contractAddresses"

export default function WalletApp() {
    const [ tokenContract, setTokenContract ] = React.useState<Contract>()
    const [ tokenBalance, setTokenBalance ] = React.useState<BigNumber>(BigNumber.from(0))
    const { account, library, chainId } = useWeb3React()
    
    React.useEffect(() => {
        let contract = new Contract(
            getContractAddress(chainId as number),
            Token.abi,
            library
        )
        setTokenContract(contract)
        contract.balanceOf(account).then((balance: BigNumber) => {
            console.log(balance.toString())
            setTokenBalance(balance)
        })
    }, [setTokenContract, setTokenBalance, account, library, chainId])

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
                    <TransferForm balance={tokenBalance} contract={tokenContract} />
                </Segment>
            </Center>
        </>
    )
}