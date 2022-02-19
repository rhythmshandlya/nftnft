import React, { useRef, useState,useEffect } from 'react'
import style from "@styles/Wallet.module.css"
import { useWeb3 } from "@components/provider/web3/Web3Provider"
import { User } from "@components/provider/user/UserProvider"
import chain from "@util/chainMap";


const Wallet = ({ status, setWalletModal }) => {
    
    const { web3Api } = useWeb3();
    const [metamaskBtn, setMetamaskBtn] = useState("Connect Metamask");
    const [balance, setBalance] = useState(1);
    const { user, setUser } = User();

    const updateBalance = async () => {
        let bal;
        try {
            bal = await web3Api.contract.walletContract.getBalance({from: user.account[0]});
            console.log(bal);
        }
        catch (err) {
            console.log(err);
        };
        setBalance(Number(bal));
    }

    const btn = useRef(null);



    const modalStyle = {
        width: "700px",
        height: "340px"
    }

    const addMoney = async () => {
        await web3Api.contract.walletContract.add({ from: user.address[0], value: 10000000000000000000 });

        let bal;
        try {
            bal = await web3Api.contract.walletContract.getBalance();
            console.log(bal);
        }
        catch (err) {
            console.log(err);
        };
        setBalance(Number(bal));
    }

    const withdrawMoney = async () => {
        await web3Api.contract.walletContract.withdraw("10",{from: user.address[0]});
        updateBalance();
    }

    const handleConnection = async () => {
        const networkId = window.ethereum.networkVersion;
        setUser({
            ...user,
            networkId,
            network: chain.get(Number(networkId))
        });
        
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
            console.log(user);
            setMetamaskBtn("Metamask Connected");
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

    useEffect(async () => {
        console.log("In use Effect");
        console.log(web3Api);

        if (web3Api.contract && user.account) {
            updateBalance();
        }

    }, [web3Api])
    

    return (
        <div className={`modal ${status}`}>
            <div className="modal-background"></div>
            <div className="card animate__animated animate__bounceInDown" style={modalStyle}>
                <div className="card-content" >
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
                    <h1>Current Balance: {balance}</h1>
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
