require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks:{
    rinkeby:{
      url:"https://eth-rinkeby.alchemyapi.io/v2/zT8xwXzQ8eUiQgqw-_axnAvqGql_cbtK",
      accounts:["a3991dfafc423b54e7117b6f8c066273a3311e982263622764835d4d3c158ced"],
    }
  }
};
