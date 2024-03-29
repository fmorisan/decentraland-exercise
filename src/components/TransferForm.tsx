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

const INITIAL_RECEIVER = ""
const INITIAL_AMOUNT = 0

export default function TransferForm({contract}: {contract: Contract}) {
    const balance = useAppSelector((store) => store.balance.value)
    const dispatch = useAppDispatch()

    const { account, library } = useWeb3React()

    const [ receiver, setReceiver ] = useState<string>(INITIAL_RECEIVER)
    // We can just use a bare BigNumber since the Dummy token provided 
    // for the demo has no decimals.
    // If we were in a real setting, displaying this number would entail
    // dividing this number by 10**decimals whenever it's to be shown.
    const [ amount, setAmount ] = useState<number>(INITIAL_AMOUNT)
    const [ waitingForTx, setWaiting ] = useState<boolean>(false)

    const isReceiverValid = isAddress(receiver)
    const isAmountValid = amount > 0 && amount <= balance
    const isFormValid = isReceiverValid && isAmountValid

    const shouldShowReceiverError = !isReceiverValid && receiver !== INITIAL_RECEIVER
    const shouldShowAmountError = !isAmountValid && amount !== INITIAL_AMOUNT

    function handleSubmit() {
        if (!isFormValid || !contract)
            return

        const signer = library.getSigner()
        contract.connect(signer).transfer(
            receiver,
            amount
        ).catch(
            () => alert("failed")
        ).then(
            () => {
                if (receiver !== account) {
                    dispatch(decrementBalanceByAmount(amount))
                }
                setWaiting(false)
            }
        )

        setWaiting(true)
    }

    return (
        <Form>
            <Field
                    label="Address"
                    type="address"
                    placeholder="0xcAfeBAbE..."
                    value={receiver}
                    onChange={(evt) => {
                        setReceiver(evt.target.value || "")
                    }}
                    error={shouldShowReceiverError}
                    message={shouldShowReceiverError?"Not a valid Ethereum address":""}/>

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
                        disabled={!isFormValid}>
                    {!waitingForTx?"Send funds!": <Loader active size="mini" />}
                </Button>
            
        </Form>
    )
}