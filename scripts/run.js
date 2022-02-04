const main=async()=>{
    const [owner,randomPerson]=await hre.ethers.getSigners();
    //deploying the WavePortal contract
    const WaveContractFactory=await hre.ethers.getContractFactory("WavePortal");
    const waveContract=await WaveContractFactory.deploy();
    await waveContract.deployed();
    console.log("contract deployed to ", waveContract.address);
    console.log("contract deployed by ", owner.address);

    console.log("Number of waves",waveCount.toNumber());

    let waveTxn=await waveContract.wave("sample message #1")
    await waveTxn.wait();

    
    waveTxn=await waveContract.connect(randomPerson).wave("sample message #2");
    await waveTxn.wait();
    
    let waves=await waveContract.getAll();
    console.log(waves);
    let waveCount;
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