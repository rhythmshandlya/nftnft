import { createContext, useContext, useEffect, useState } from "react";
import chain from "@util/chainMap";
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from "web3";

const UserContext = createContext(null)

const UserProvider = ({ children }) => {
    
    const [user, setUser] = useState({
        address: null,
        network: null,
        networkId: null
    });

    useEffect(() => {
        console.log(chain.get(1));

        const networkId = window.ethereum.networkVersion;
        setUser({
            ...user,
            networkId,
            network: chain.get(Number(networkId))
        });

        window.ethereum.on('accountsChanged', function (account) {
            setUser({
                ...user,
                address: account
            });
        })
          
        window.ethereum.on('networkChanged', function (networkId) {
            setUser({
                ...user,
                networkId,
                network: chain.get(Number(networkId))
            });
        })
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export function User() { 
    return useContext(UserContext)
}

export default UserProvider;