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

export default function TransferForm({contract}: {contract: Contract}) {
    const balance = useAppSelector((store) => store.balance.value)
    const dispatch = useAppDispatch()

    const { library } = useWeb3React()

    const [ receiver, setReceiver ] = useState<string>("")
    // We can just use a bare BigNumber since the Dummy token provided 
    // for the demo has no decimals.
    // If we were in a real setting, displaying this number would entail
    // dividing this number by 10**decimals whenever it's to be shown.
    const [ amount, setAmount ] = useState<number>(0)
    const [ waitingForTx, setWaiting ] = useState<boolean>(false)


    const isReceiverValid = isAddress(receiver)
    const isAmountValid = amount > 0 && amount <= balance
    const isFormValid = isReceiverValid && isAmountValid

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
                dispatch(decrementBalanceByAmount(amount))
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
                    error={!isReceiverValid} />

            <Field 
                    label="Amount"
                    type="number"
                    placeholder="1.00"
                    onChange={(evt) => {
                        setAmount(parseInt(evt.target.value) || 0)
                    }}
                    error={!isAmountValid}/>
            
                <Button
                        primary
                        onClick={handleSubmit}
                        disabled={!isFormValid}>
                    {!waitingForTx?"Send funds!": <Loader active size="mini" />}
                </Button>
            
        </Form>
    )
}