import { useState, useCallback, ReactPropTypes } from 'react'
import { BigNumber, Contract, Signer } from 'ethers'
import {
    Form,
    Field,
    Button,
    Loader
} from 'decentraland-ui'
import { isAddress } from '@ethersproject/address'
import { useWeb3React } from '@web3-react/core'

export default function TransferForm({balance, contract}: {balance: BigNumber, contract: Contract}) {
    const { library } = useWeb3React()
    const [ receiver, setReceiver ] = useState<string>("")
    // We can just use a bare BigNumber since the Dummy token provided 
    // for the demo has no decimals.
    // If we were in a real setting, displaying this number would entail
    // dividing this number by 10**decimals whenever it's to be shown.
    const [ amount, setAmount ] = useState<BigNumber>(BigNumber.from("0"))
    const [ waitingForTx, setWaiting ] = useState<boolean>(false)

    const isReceiverValid = isAddress(receiver)
    const isAmountValid = amount.gt(0) && amount.lte(balance)
    const isFormValid = isReceiverValid && isAmountValid

    function handleSubmit() {
        if (!isFormValid)
            return

        const signer = library.getSigner()
        contract.connect(signer).transfer(
            receiver,
            amount
        ).catch(() => alert("failed")).then(() => setTimeout(() => setWaiting(false), 1000))

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
                        setAmount(BigNumber.from(evt.target.value || "0"))
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