import React, { useRef, useState,useEffect } from 'react'
import style from "@styles/Wallet.module.css"
import { useWeb3 } from "@components/provider/web3/Web3Provider"
import {User} from "@components/provider/user/UserProvider"

const Wallet = ({ status, setWalletModal }) => {
    
    const { web3Api } = useWeb3();
    const [metamaskBtn, setMetamaskBtn] = useState("Connect Metamask");
    const btn = useRef(null);

    const {user,setUser} = User();

    const modalStyle = {
        width: "700px",
        height: "340px"
    }
    
    const handleConnection = async () => {
        if (metamaskBtn === "Get Metamask Today") { 
            window.open("https://metamask.io/download/", "_blank");
            window.location.reload();
        }
        try {
            const account = await web3Api.provider.request({ method: 'eth_requestAccounts' })
            setUser(
                {
                    ...user,
                    address: account
                }
            );
            setMetamaskBtn("Metamask Connected");
            btn.current.classList.add("Disabled");
            //btn.current.disabled = true;
        }
        catch (err) {
            if (err.code === -32002) {
                setMetamaskBtn("Access Denied")
                window.location.reload()
            } else {
                setMetamaskBtn("Get Metamask Today");
            } 
        }
    }

    return (
        <div className={`modal ${status}`}>
            <div className="modal-background"></div>
            <div className="card animate__animated animate__bounceInDown" style={modalStyle}>
                <div className="card-content">
                    <div className="content" className={style.dFlex}>
                        <button className="button is-light p-3" ref={btn} onClick={() => { handleConnection() }}>
                            <img src="https://docs.metamask.io/metamask-fox.svg" className='p-2' />
                            {metamaskBtn}
                        </button>
                        <img width="35px" className='pointer'
                            onClick={() => { setWalletModal("") }}
                            src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/50/000000/external-close-sales-vitaliy-gorbachev-fill-vitaly-gorbachev.png" />
                    </div>
                    <h1>{user.address}</h1>
                    <h1>{user.networkId}</h1>
                    <h1>{user.network}</h1>
                </div>
            </div>
            <div className="modal-content">
            </div>
        </div>
    );
};

export default Wallet;
