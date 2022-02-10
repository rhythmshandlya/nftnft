import { createContext, useContext, useEffect, useState } from "react";
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from "web3";

const Web3Context = createContext(null)

const Web3Provider = ({ children }) => {
    
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
        inLoading: true
    })

    useEffect(() => {
        const loadProvider =async () => { 
            const provider = await detectEthereumProvider()

            if (provider) {
                const web3 = new Web3(provider);

                setWeb3Api({
                    provider: provider,
                    web3: web3,
                    contract: null,
                    isLoading: false
                });

            } else {
                setWeb3Api({
                    ...web3Api,
                    isLoading: false
                });
                console.error('Please install MetaMask!')
            }
        }  
        loadProvider();
    }, [])

    return (
        <Web3Context.Provider value={{web3Api,setWeb3Api}}>
            {children}
        </Web3Context.Provider>
    );
}

export function useWeb3() { 
    return useContext(Web3Context)
}

export default Web3Provider;