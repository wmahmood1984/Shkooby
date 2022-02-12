import { Overview, Pools } from "../sections/homepageSections";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { chainID } from "../chainID";
const Home = ({
  account,
  contract,
  contract2,
  poolIds,
  setStackOpen,
  stakeOpen,
  stackDetailOpen,
  setStackDetailOpen,
  contractAddress2,
  contractAddress,
  loadWeb3,
}) => {


  const networkId = useSelector((s)=>{
    return s.adoptReducer.networkId
  })

  window.ethereum.on("chainChanged", (_chainId) => {
    window.location.reload();
  });

  window.ethereum.on("accountsChanged", (account) => {
    window.location.reload();
  });

if ( networkId && networkId != chainID){
    console.log("sab galat he ",networkId)    
    toast("Please connect to main net", {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
      });
}

  const loadBlockchainData =  () => {
    


      return <div> <Overview></Overview></div>
    
  };
  return (
    <div>
      {networkId &&  networkId == chainID?  
      
      <div className="container">
        <Overview
          setStackOpen={setStackOpen}
          stakeOpen={stakeOpen}
          contract={contract}
          contract2={contract2}
          account={account}
          //poolIds={poolIds}
          setStackDetailOpen={setStackDetailOpen}
          stackDetailOpen={stackDetailOpen}
          contractAddress2={contractAddress2}
          contractAddress={contractAddress}
          loadWeb3={loadWeb3}
        />
        <Pools
          contract={contract}
          contract2={contract2}
          account={account}
          poolIds={poolIds}
          setStackOpen={setStackOpen}
          stakeOpen={stakeOpen}
          setStackDetailOpen={setStackDetailOpen}
          stackDetailOpen={stackDetailOpen}
          contractAddress2={contractAddress2}
          contractAddress={contractAddress}
          loadWeb3={loadWeb3}
        />
        {/* <Deposits /> */}
      </div> : loadBlockchainData()}
      
    </div>
  );
};

export default Home;
