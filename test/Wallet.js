const Wallet = artifacts.require("Wallet");
contract('Wallet', async function (accounts) {
    it('works', async () => {
        const wallet = await Wallet.deployed();
        const address=await wallet.address;
        console.log(address)
        assert(address!="","address not null")
    })
    it("Eth Sender works", async()=>{
        const wallet = await Wallet.deployed();
        console.log(accounts[5])
        console.log("before"+await wallet.balanceOf(accounts[5]))
        await wallet.sendEth({from: accounts[5], value: 10000000000000000000})
        console.log("after"+await wallet.balanceOf(accounts[5]))
        console.log("Balance is "+await wallet.getBalance())
    })
    // it("recives eth",async()=>{
    //     const wallet = await Wallet.deployed();
    //     await wallet.recieve();
    // })
    it("can send back eth",async()=>{
        const wallet = await Wallet.deployed();
        await wallet.withdrawEth(5)
        console.log("Balance is "+await wallet.getBalance())
    })
    
})
