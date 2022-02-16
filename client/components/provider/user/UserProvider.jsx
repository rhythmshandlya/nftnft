import { createContext, useContext, useEffect, useState } from "react";
import chain from "@util/chainMap";

const UserContext = createContext(null)

const UserProvider = ({ children }) => {
    
    const [user, setUser] = useState({
        address: null,
        network: null,
        networkId: null,
        isUnlocked: null
    });

    useEffect(async () => {
        console.log(chain.get(1));

        const networkId = window?.ethereum?.networkVersion;
        const isUnlocked = await window?.ethereum?._metamask.isUnlocked();

        setUser({
            ...user,
            isUnlocked,
            networkId,
            network: chain.get(Number(networkId))
        });
        

        window?.ethereum?.on('accountsChanged', function (account) {
            setUser({
                ...user,
                address: account,
                isUnlocked: true
            });
        })
          
        window?.ethereum?.on('networkChanged', function (networkId) {
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