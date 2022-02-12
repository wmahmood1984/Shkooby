/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { LockedRewards, Reward } from "../sections/rewardpageSections";
const Rewards = ({
  contract,
  contract2,
  contractAddress,
  contractAddress2,
  poolIds,
  account,
  stackOpen,
  setStackOpen,
  stackDetailOpen,
  setStackDetailOpen,
}) => {
  const [stakesDetails, setStakesDetails] = useState([]);
  useEffect(() => {
    // const getStakes = async () => {
    //   try {
    //     if (contract) {
    //       const data = await contract.methods
    //         .getUserStakeIds()
    //         .call({ from: account });

    //       // console.log(data.length, stakesDetails.length);
    //       if (data.length > stakesDetails.length) {
    //         data.forEach(async (el) => {
    //           const stakesDetail = await contract.methods
    //             .getUserStakeDetails(el)
    //             .call();

    //           setStakesDetails((prev) => [...prev, stakesDetail]);
    //         });
    //       }
    //       console.log(data, stakesDetails);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getStakes();
  }, [account, contract]);

  return (
    <div className="container">
      <Reward
        stakesDetails={stakesDetails}
        poolIds={poolIds}
        contract={contract}
        contract2={contract2}
        contractAddress={contractAddress}
        contractAddress2={contractAddress2}
        account={account}
        stackOpen={stackOpen}
        setStackOpen={setStackOpen}
        stackDetailOpen={stackDetailOpen}
        setStackDetailOpen={setStackDetailOpen}
      />
      <LockedRewards
        contract={contract}
        contract2={contract2}
        contractAddress={contractAddress}
        contractAddress2={contractAddress2}
        account={account}
      />
    </div>
  );
};

export default Rewards;
