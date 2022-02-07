import React,{useEffect,useState} from "react";
import { ethers } from "ethers";
import './App.css';
import contractInterface from './utils/WavePortal.json'

export default function App() {
  //set user account state hook
  const [userAccount, setUserAccount]=useState("");
  const [waves, setWaves]=useState([]);
  const [message,setMessage]=useState("")
  const contractAddress=
  "0x375BE14f4816b57b2f1c180f88c62fdF38c114Ac";
  /*
  The application binary interface of the contract
  This helps the program interact with the Rinkeby chain
  */
  const contractABI=contractInterface.abi;
  const getAll=async()=>{
      try{
        const {ethereum} = window;
        if(ethereum){
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const waves = await wavePortalContract.getAll();
        let relevantData = [];

        waves.forEach(wave => {
          relevantData.push({
            message: wave.message,
            address: wave.sender,
            timestamp: new Date(wave.timestamp * 1000),
          });
        }); 
        setWaves(relevantData);
        console.log(waves);

        }else{
          console.log("Ethereum object unsupported on this browser")
        }
      }catch(e){
        console.log(e);
      }
  }
  console.log(waves);
  //checks if wallet is connected to the browser
  const walletisConnected=async()=>{
    try{
      
      const {ethereum}=window;
      if(!ethereum){
        console.log("Please connect your MetaMask wallet to your browser")
      }else{
        console.log("We have the ethereum object",ethereum)
        const provider=new ethers.providers.Web3Provider(ethereum);
        const signer=provider.getSigner();
        const wavePortalContract=new ethers.Contract(contractAddress, contractABI, signer);
        let count = await wavePortalContract.getTotalWaves();
        let allWaves=await wavePortalContract.getAll();
        setWaves(allWaves)
      }

    //check if we are allowed to access user Ethereum account
      const accounts= await ethereum.request({method:"eth_accounts"})
      if(accounts.length!==0){
        const account=accounts[0];
        console.log("User account found and authorised \nAccount:",account)
        setUserAccount(account)
        
      }else{
        console.log("Unable to access user account")
      }

    }catch(error){
      console.log(error)
    }
  }
  //method to connect metamask
  const connectWallet=async()=>{
      try{
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        console.log("Connected", accounts[0]);
        setUserAccount(accounts[0]);
      }catch(error){
        console.log(error)
        alert("Use a supported browser👩‍💻 (Chrome, Brave, etc)")
      }
  }

  const wave = async() => {
    try{
      const {ethereum}=window;
      if(ethereum){
        const provider=new ethers.providers.Web3Provider(ethereum);
        const signer=provider.getSigner();
        const wavePortalContract=new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        //now we wave
        const waveTxn=await wavePortalContract.wave(message);
        console.log("Mining...",waveTxn.hash)
        waveTxn.wait();
        console.log("Mined--",waveTxn.hash);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    }catch(err){
      console.log(err)
      alert("Wait 15 mins to make your next entry🙄")
    }finally{
        setMessage("");
        setTimeout(()=>{
          window.location.reload();
        },9999)
        
    }
  }
  const handleMessage=(e)=>{
    setMessage(e.target.value);
  }
  
  useEffect(()=>{
  //   let wavePortalContract;

  // const onNewWave = (from, timestamp, message) => {
  //   console.log("newWave", from, timestamp, message);
  //   setWaves(prevState => [
  //     ...prevState,
  //     { 
  //       message: message,
  //       address: from,
  //       timestamp: new Date(timestamp * 1000)
  //     },
  //   ]);
  // };

  // if (window.ethereum) {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();

  //   wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
  //   wavePortalContract.on("newWave", onNewWave);
  // }

  // return () => {
  //   if (wavePortalContract) {
  //     wavePortalContract.off("newWave", onNewWave);
  //   }
  // };
  walletisConnected();
  },[])
  return (
  <div>
    <div className="mainContainer">


      <div className="dataContainer">
        {!userAccount&&
        <div>
          <div className="header">
          Welcome to Madhav's first DApp😼
          </div>
          <div className="bio">
          This app was built on React and Solidity and demonstrates how to deploy an app on ethereum.<br></br>
          </div>
          <h3 style={{color:"white"}}>
              Log in using metamask to use a decentralised online forum and win potential rewards!
          </h3>
          <button className="waveButton" onClick={connectWallet}>
            Connect MetaMask 🦊
          </button>
        </div> 
        }
      <div>   
    </div>

    </div>
    </div>
    <div className="authDone">
        {userAccount&&
        <div>
          <div className="inputArea">
           <p style={{
             color:"white",
             fontSize:"20px",
             margin:"10px",
             fontWeight:"600",
             fontFamily:"Futura"}}>You stand a chance of winnning some rETH! Wave at me and hope for the best 😪😈</p>
            <div style={{display:"flex", flexDirection:'row', alignItems:'center'}}>
              <input type="text" placeholder="What's on your mind?" onChange={handleMessage} value={message}></input>
              <button className="waveButton" onClick={wave}>
                Wave at Me👋
              </button>
            </div>
          </div>
        </div>
        }
        <div>
          <div style={{
            color:"rgb(15, 102, 112)"}}>
          {
            waves.slice(0).reverse().map((wave,index)=>{
              return (
            <div className="messageBox" key={index} style={{ 
              backgroundColor: "OldLace", 
              padding: "8px",
              borderRadius:"20px",
              width:'81%'
            }}>
            <div className="messageDetails"
            style={{
              display:"flex",
              fontSize:"10px",
              padding:'10px',
              justifyContent:'space-between'}}>
                <div>
                  @{wave.sender/**.slice(0,20)+"..."*/}
                </div>
                <div>
                  {new Date(wave.timestamp.toNumber()).toString().split(" ").slice(4,5)}
                </div>
            </div>
            <div style={{
                fontFamily:"Futura", color:"black",
                textAlign:'left',
                padding:'50px 10px'
              }}>{wave.message}</div>
            </div>)
            })
            
          }
          </div>
          </div>
    </div>

</div>
  );
}
