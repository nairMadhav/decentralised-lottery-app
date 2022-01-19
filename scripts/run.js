const main=async()=>{
    const [owner,randomPerson]=await hre.ethers.getSigners();
    const WaveContractFactory=await hre.ethers.getContractFactory("WavePortal");
    const waveContract=await WaveContractFactory.deploy();
    await waveContract.deployed();

    console.log("contract deployed to ", waveContract.address);
    console.log("contract deployed by ", owner.address);

    let waveCount;
    waveCount=await waveContract.getTotalWaves();

    let waveTxn=await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

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