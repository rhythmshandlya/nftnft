import React from 'react';

const Wallet = ({status, setWalletModal}) => {
    return (
        <div class={`modal ${status}`}>
            <div class="modal-background"></div>
            <div class="modal-content">
            </div>
            <button class="modal-close is-large" aria-label="close" onClick={() => {setWalletModal("")}}></button>
        </div>
    );
};

export default Wallet;
