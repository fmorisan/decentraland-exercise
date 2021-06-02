/**
 * Contract addresses for different networks
 */

import { ethers } from "ethers"

const CONTRACT_ADDRESSES = new Map<number, string>([
    // Hardhat / Local
    [1337, "0x5FbDB2315678afecb367f032d93F642f64180aa3"],
    // Rinkeby
    [4, "0x30EDF7b409296b8c67bA5F059Ee935D9cd27804F"]
])

export default function getContractAddress(chainId: number) : string {
    let value = CONTRACT_ADDRESSES.get(chainId)
    if (!value) return ethers.constants.AddressZero
    return value
}