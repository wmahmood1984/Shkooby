import { Overview, Pools } from "../sections/homepageSections";

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
  return (
    <div>
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
      </div>
    </div>
  );
};

export default Home;
