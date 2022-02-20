import React, { useRef, useState,useEffect } from 'react'
import style from "@styles/Wallet.module.css"
import { useWeb3 } from "@components/provider/web3/Web3Provider"
import { User } from "@components/provider/user/UserProvider"
import chain from "@util/chainMap";


const Wallet = ({ status, setWalletModal }) => {
    
    const { web3Api } = useWeb3();
    const { user, setUser } = User();
    const [metamaskBtn, setMetamaskBtn] = useState("Connect Metamask");
    const btn = useRef(null);
    const modalStyle = {
        width: "700px",
        height: "340px"
    }

    const updateBalance = async () => {
        let bal;
        console.log(user.address);
        try {
            bal = Number(await web3Api.contract.walletContract.getBalance({from: user.address}));
        }
        catch (err) {
            console.log(err);
        };
        setUser({...user,balance: bal});
    }

    const addMoney = async () => {
        await web3Api.contract.walletContract.add({ from: user.address, value: 10000000000000000000 });
        updateBalance();
    }

    const withdrawMoney = async () => {
        await web3Api.contract.walletContract.withdraw("10",{from: user.address});
        updateBalance();
    }

    const handleConnection = async () => {
        
        const networkId = window.ethereum.networkVersion;
        
        if (metamaskBtn === "Get Metamask Today") {
            window.open("https://metamask.io/download/", "_blank");
            window.location.reload();
        }

        try {
            const acc = await web3Api.provider.request({ method: 'eth_requestAccounts' })
            console.log(acc[0]);
            setMetamaskBtn("Metamask Connected");

            let bal;
            try {
                bal = Number(await web3Api.contract.walletContract.getBalance({from: user.address}));
            }
            catch (err) {
                console.log(err);
            };
            setUser(
                {
                    ...user,
                    balance: bal,
                    address: acc[0],
                    networkId,
                    network: chain.get(Number(networkId))
                }
            );
        }
        catch (err) {
            console.log(err);
            if (err.code === -32002) {
                setMetamaskBtn("Connect To Metamask")
                window.location.reload();
            } else {
                setMetamaskBtn("Get Metamask Today");
            }
        }
    }

    return (
        <div className={`modal ${status}`}>
            <div className="modal-background"></div>
            <div className="card animate__animated animate__bounceInDown" style={modalStyle}>
                <div className="card-content" >
                    <div className="content" className={style.dFlex}>
                        <button className="button is-light p-3" id="connect-metamask" ref={btn} onClick={() => { handleConnection() }}>
                            <img src="https://docs.metamask.io/metamask-fox.svg" className='p-2' />
                            {metamaskBtn}
                        </button>
                        <img width="35px" className='pointer'
                            onClick={() => { setWalletModal("") }}
                            src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/50/000000/external-close-sales-vitaliy-gorbachev-fill-vitaly-gorbachev.png" />
                    </div>
                    <h1>{user.address}</h1>
                    <h1>{user.network}</h1>
                    <h1>Current Balance: {user.balance}</h1>
                    <button className="button is-light p-3" onClick={() => { addMoney() }}>Add Money</button>
                    <button className="button is-light p-3" onClick={() => { withdrawMoney() }}>Withdraw Money</button>
                </div>
            </div>
            <div className="modal-content">
            </div>
        </div>
    );
};

export default Wallet;
