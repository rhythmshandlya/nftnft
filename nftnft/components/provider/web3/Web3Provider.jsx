import { createContext, useContext, useState } from "react";

const Web3Context = createContext(null);

export default Web3Provider = ({ children }) => {

    const [web3, setWeb3] = useState("Hello World!");

    return (
        <Web3Context.Provider value={{web3,setWeb3}}>
            {children}
        </Web3Context.Provider>
    );
}

export function useWeb3() { 
    return useContext(Web3Context);
}