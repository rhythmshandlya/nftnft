import React, { useRef, useState,useEffect } from 'react'
import style from "@styles/Wallet.module.css"
import { useWeb3 } from "@components/provider/web3/Web3Provider"
import { User } from "@components/provider/user/UserProvider"
import chain from "@util/chainMap";


const Wallet = ({ status, setWalletModal }) => {
    
    const { web3Api } = useWeb3();
    const { user, setUser } = User();
    const [metamaskBtn, setMetamaskBtn] = useState("Connect Metamask");
    const [add, setAdd] = useState(0);
    const [withdraw, setWithdraw] = useState(0);

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
        await web3Api.contract.walletContract.add({ from: user.address, value: add*1000000000000000000 });
        updateBalance();
        setAdd(0);
    }

    const withdrawMoney = async () => {
        await web3Api.contract.walletContract.withdraw(withdraw.toString(),{from: user.address});
        updateBalance();
        setWithdraw(0);
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
            <div className="card animate__animated animate__bounceIn" style={modalStyle}>
                <div className="card-content" >
                    <div className="content" className={style.dFlex}>
                        <button className="button is-light p-3" id="connect-metamask" ref={btn} onClick={() => { handleConnection() }}>
                            <img src="https://docs.metamask.io/metamask-fox.svg" className='p-2' />
                            {metamaskBtn}
                        </button>
                        <img className='pointer'
                            width="40px"
                            height="30px"
                            onClick={() => { setWalletModal("") }}
                            src="https://img.icons8.com/windows/64/000000/macos-close.png" />
                    </div>
                    <hr />
                    <p class="title is-3 m-3 has-text-primary">{user.balance} ETH</p>

                    <div className='columns is-multiline'>
                        <div className='column'>
                            <div className="field">
                                <div className="control">
                                    <input className="input" type="number" placeholder="Enter Amount" value={add} onChange={(e) => {setAdd(e.target.value)}}/>
                                </div>
                            </div>
                        </div>
                        <div className='column'>
                            <button className="button is-light p-3" onClick={() => { addMoney() }}>Add</button>
                        </div>
                    </div>

                    <div className='columns'>
                        <div className='column'>
                            <div className="field">
                                <div className="control">
                                    <input className="input" type="number" placeholder="Enter Amount" value={withdraw} onChange={(e) => {setWithdraw(e.target.value)}}/>
                                </div>
                            </div>
                        </div>
                        <div className='column'>
                            <button className="button is-light p-3" onClick={() => { withdrawMoney() }}>Withdraw</button>
                        </div>
                    </div>
                </div>
                
                <div className='columns'>
                    <div className='column is-two-thirds'>
                        <p className='title is-6 m-4'>{user.address}</p>
                    </div>
                    <div className='column'>
                        <p className='title is-6 m-4'>{user.network}</p>
                    </div>
                </div>
            </div>
            <div className="modal-content">
            </div>
        </div>
    );
};

export default Wallet;
