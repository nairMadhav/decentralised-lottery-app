const { Contract } = require("@ethersproject/contracts");

const main=async()=>{
    let waveCount;
    //deploying the WavePortal contract
    const WaveContractFactory=await hre.ethers.getContractFactory("WavePortal");
    const waveContract=await WaveContractFactory.deploy();
    await waveContract.deployed();
    console.log("contract deployed to ", waveContract.address);

    waveCount=await waveContract.getTotalWaves();
    console.log("Number of waves",waveCount.toNumber());

    let waveTxn=await waveContract.wave("sample message #1")
    await waveTxn.wait();

    const [_, randomPerson] = await hre.ethers.getSigners();
    waveTxn=await waveContract.connect(randomPerson).wave("sample message #2");
    await waveTxn.wait();
    
    let waves=await waveContract.getAll();
    console.log(waves);
    
    waveCount=await waveContract.getTotalWaves();



}
const runMain=async()=>{
    try {
       await main();
       process.exit(0); 
    } catch (error) {
       console.log(error);
       process.exit(1); 
    }
}
runMain();