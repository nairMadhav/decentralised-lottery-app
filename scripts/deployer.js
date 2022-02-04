const main = async () => {
    //getting signer details to deploy contract and also getting account balance of deployer
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
  
    //create token and factory to deploy our Waveportal contract and await deployment
    const Token = await hre.ethers.getContractFactory("WavePortal");
    const portal = await Token.deploy();
    await portal.deployed();
  
    console.log("WavePortal address: ", portal.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();