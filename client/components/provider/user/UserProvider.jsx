import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null)

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        address: null,
        network: null,
        networkId: null,
        balance: 0,
        isUnlocked: null,
    });

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