import { useState } from 'react'
import { Contract } from 'ethers'
import {
    Form,
    Field,
    Button,
    Loader
} from 'decentraland-ui'
import { isAddress } from '@ethersproject/address'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch, useAppSelector } from 'hooks'
import { decrementBalanceByAmount } from 'features/balance'

const INITIAL_AMOUNT = 0

export default function BurnForm({contract}: {contract: Contract}) {
    const balance = useAppSelector((store) => store.balance.value)
    const dispatch = useAppDispatch()

    const { account, library } = useWeb3React()

    const [ amount, setAmount ] = useState<number>(INITIAL_AMOUNT)
    const [ waitingForTx, setWaiting ] = useState<boolean>(false)

    const isAmountValid = amount > 0 && amount <= balance

    const shouldShowAmountError = !isAmountValid && amount !== INITIAL_AMOUNT

    function handleSubmit() {
        if (!isAmountValid || !contract)
            return

        const signer = library.getSigner()
        contract.connect(signer).burn(
            amount
        ).catch(
            () => alert("failed")
        ).then(
            () => {
                dispatch(decrementBalanceByAmount(amount))
                setWaiting(false)
            }
        )

        setWaiting(true)
    }

    return (
        <Form>
            <Field 
                    label="Amount"
                    type="number"
                    placeholder="1.00"
                    onChange={(evt) => {
                        setAmount(parseInt(evt.target.value) || 0)
                    }}
                    error={shouldShowAmountError}
                    message={shouldShowAmountError?`Amount should be between 0 and ${balance}`:""}/>
            
                <Button
                        primary
                        onClick={handleSubmit}
                        disabled={!isAmountValid}>
                    {!waitingForTx?"Burn tokens": <Loader active size="mini" />}
                </Button>
            
        </Form>
    )
}