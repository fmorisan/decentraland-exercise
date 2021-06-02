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

import Token from 'abi/Token.json'
import TransferForm from './TransferForm'
import getContractAddress from 'contractAddresses'
import { useAppDispatch, useAppSelector } from 'hooks'
import { setBalance } from 'features/balance'

export default function WalletApp() {
    const [ tokenContract, setTokenContract ] = React.useState<Contract>()
    const { account, library, chainId } = useWeb3React()
    const dispatch = useAppDispatch()
    const balance = useAppSelector((state) => state.balance.value)
    
    React.useEffect(() => {
        let contract = new Contract(
            getContractAddress(chainId as number),
            Token.abi,
            library
        )
        contract.balanceOf(account).then((balance: BigNumber) => {
            dispatch(setBalance(balance.toNumber()))
        })
        setTokenContract(contract)
    }, [setTokenContract, account, library, chainId, dispatch])

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
                        {balance.toString()}
                    </Mana>
                    <Header>
                        Send funds
                    </Header>
                    <TransferForm contract={tokenContract}/>
                </Segment>
            </Center>
        </>
    )
}