/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { InformationModal, Title } from "../../components";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import Slogo from "../../assets/images/shkooby_icon.png";
// import SElogo from "../../assets/images/shkoobyEth_icon.png";
import { MiniButton } from "../../components/button";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Web3 from "web3";
import { useDispatch, useSelector } from 'react-redux';
import { claimF,unStaking,claimF2,unStaking2 } from "../../state/ui";
// import InformationModal from "../components/modals/InformationModal";
// import ConfirmationModal from "../components/modals/ConfirmationModal";
const reviewData = [
  {
    img: Slogo,
    name: "Flexi Pool",
    amount: "1030 SHKOOBY",
    reward: "5.2 SHKOOBY",
    timer: 0,
  },
  {
    img: Slogo,
    name: "Flexi Pool",
    amount: "$0.00",
    reward: "4.3 SHKOOBY",
    timer: 2592000,
  },
  {
    img: Slogo,
    name: "Locked Pool (1 to 6 Months)",
    amount: "$5.78",
    reward: "2.1 SHKOOBY",
    timer: 7776000,
  },
  // {
  //   img: Slogo,
  //   name: "Flexi Pool",
  //   amount: "$74.76",
  //   reward: "3.4 SHKOOBY",
  //   timer: "23 Nov 2323 12.00",
  // },
];

const reviewData2 = [
  {
    img: Slogo,
    name: "Flexi Pool",
    amount: "1030 SHKOOBY",
    reward: "5.2 SHKOOBY",
    timer: 0,
  },
  {
    img: Slogo,
    name: "Flexi Pool",
    amount: "$0.00",
    reward: "4.3 SHKOOBY",
    timer: 2592000,
  },
  {
    img: Slogo,
    name: "Locked Pool (1 to 6 Months)",
    amount: "$5.78",
    reward: "2.1 SHKOOBY",
    timer: 7776000,
  },
  // {
  //   img: Slogo,
  //   name: "Flexi Pool",
  //   amount: "$74.76",
  //   reward: "3.4 SHKOOBY",
  //   timer: "23 Nov 2323 12.00",
  // },
];
dayjs.extend(utc);
// const date = dayjs.utc(1318781876 * 100).format();

const Reward = ({
  //stakesDetails,
  contract,
  contract2,
  contractAddress,
  contractAddress2,

  account,
}) => {
  const [transactionRejected, setTransactionRejected] = useState(false);
  const [transactionFailed, setTransactionFailed] = useState(false);
  const [confirmTransaction, setConfirmTransaction] = useState(false);
  const [transactionInProgress, setransactionInProgress] = useState(false);
  const [confirmTransaction2, setConfirmTransaction2] = useState(false);
  const [transactionInProgress2, setransactionInProgress2] = useState(false);
  const [transactionSuccess, setransactionSuccess] = useState(false);
  const [lessAmount, setLessAmount] = useState(false);
  const [totalClaimedBalance, setTotalClaimedBalance] = useState(0);
  const dispatch = useDispatch()

  
  useEffect(() => {
    // const getData = async () => {
    //   if (contract) {
    //     const totalClaimedBalance = await contract.methods
    //       .getUserDetails()
    //       .call({ from: account });
    //     console.log(totalClaimedBalance);
    //     setTotalClaimedBalance(
    //       Web3.utils.fromWei(totalClaimedBalance[2], "ether")
    //     );
    //   }
    // };
    // getData();
  }, []);
  
  const stakesDetails = useSelector((state)=>{

    return state.adoptReducer.UserDetails;
  });


  const stakesDetails2 = useSelector((state)=>{
    return state.adoptReducer.UserDetails2;
  });


  const claimed = useSelector((state)=>{
    var shk = Number(state.adoptReducer.claimedReward)
    var shk_ETH = Number(state.adoptReducer.claimedReward2) 
    return (shk+shk_ETH)/1000000000000000000
  });

  console.log("claimed",claimed)

  console.log("details 2",stakesDetails2)
  console.log("details 1",stakesDetails)
  
  const claim = (stakeId)=>{
    
    dispatch(claimF({stakeId}))
    
  }


  const unStake = (stakeId)=>{
    
    dispatch(unStaking({stakeId}))
    
  }



  const claim2 = (stakeId)=>{
    
    dispatch(claimF2({stakeId}))
    
  }


  const unStake2 = (stakeId)=>{
    
    dispatch(unStaking2({stakeId}))
    
  }

  var currentTimeinSeconds = new Date().getTime() / 1000


  console.log("time in ", stakesDetails && Number(stakesDetails[0].timeIn))
  console.log("time to add ", stakesDetails && reviewData[stakesDetails[0].id-1].timer)
  console.log("total", stakesDetails&&  Number(stakesDetails[0].timeIn)+ reviewData[stakesDetails[0].id-1].timer)
  console.log("current time ", currentTimeinSeconds)

console.log("check",stakesDetails&& Number(stakesDetails[0].timeIn) + reviewData[stakesDetails[0].id-1].timer < currentTimeinSeconds)
  
  // const claim = (stakeId) => {
  //   if (contract) {
  //     setConfirmTransaction(true);
  //     //   window.localStorage.setItem("approving", "true");

  //     contract.methods
  //       .claimAndLockRewards(stakeId)
  //       .send({ from: account })
  //       .on("transactionHash", async function (response) {
  //         setConfirmTransaction(false);
  //         // setListApprove(true);
  //         setransactionInProgress(true);
  //       })
  //       .on("confirmation", function () {
  //         // setListNftApproved(true);
  //         setConfirmTransaction(false);
  //         setransactionInProgress(false);
  //         // setListApprove(false);
  //         // setApprove(true);
  //         // setListNftApproved(false);
  //         // setApproved(true);
  //         // setransactionSuccess(true);
  //         //   window.localStorage.removeItem("approving");
  //         setransactionSuccess(true);
  //       })
  //       .on("error", function (error, receipt) {
  //         //   window.localStorage.removeItem("approving");
  //         if (error.code === 4001) {
  //           setTransactionRejected(true);
  //           setConfirmTransaction(false);
  //           // setListApprove(false);
  //         } else {
  //           setTransactionFailed(true);
  //           setConfirmTransaction(false);
  //           // setListApprove(false);
  //         }
  //       });
  //   }
  // };
  // const unStake = (stakeId) => {
  //   if (contract) {
  //     setConfirmTransaction2(true);
  //     //   window.localStorage.setItem("approving", "true");

  //     contract.methods
  //       .unstake(stakeId)
  //       .send({ from: account })
  //       .on("transactionHash", async function (response) {
  //         setConfirmTransaction2(false);
  //         // setListApprove(true);
  //         setransactionInProgress2(true);
  //       })
  //       .on("confirmation", function () {
  //         // setListNftApproved(true);
  //         setConfirmTransaction2(false);
  //         setransactionInProgress2(false);
  //         // setListApprove(false);
  //         // setApprove(true);
  //         // setListNftApproved(false);
  //         // setApproved(true);
  //         // setransactionSuccess(true);
  //         //   window.localStorage.removeItem("approving");
  //         setransactionSuccess(true);
  //       })
  //       .on("error", function (error, receipt) {
  //         //   window.localStorage.removeItem("approving");
  //         if (error.code === 4001) {
  //           setTransactionRejected(true);
  //           setConfirmTransaction2(false);
  //           // setListApprove(false);
  //         } else {
  //           setTransactionFailed(true);
  //           setConfirmTransaction2(false);
  //           // setListApprove(false);
  //         }
  //       });
  //   }
  // };
  return (
    <div>
      <div className="bg-dark-500 py-10">
        <Title title="Rewards" desc="" />
        <p className="font-normal  text-base mt-2 text-gray md:mx-20 text-center  xl:mx-72 ">
          Stake $Shkooby in one of our two core pools to start earning rewards
          with Flexi and variable locking pools explained below:
        </p>
        <p className="font-normal  text-base text-center mt-2 text-gray md:mx-20  xl:mx-72 ">
          Shkooby Flexi Pool allows you to redeem your staked assets at any
          time.
        </p>
        <p className="font-normal  text-base text-center mt-2 text-gray md:mx-20  xl:mx-72 ">
          Shkooby Locked Pool allows you to staking your assets for a specific
          time frame. Compared to Flexible Staking, Locked Staking provides
          heigher interests but requires you to lock your assets for the
          displayed duration. You can still redeem your assets at any time you
          wish before the end of the locked duration, but you won't receive any
          interest generated over your staking period
        </p>
        <div className=" bg-dark-700 mx-14 py-10 px-6 mt-10  rounded-lg">
          <div className=" text-center mx-auto">
            <p className=" font-semibold text-xl md:text-2xl text-primary uppercase">
              Claimed Rewards
            </p>
            <p className="font-bold text-xl md:text-3xl mt-4">
              {claimed.toFixed(0)} SHKOOBY
            </p>
          </div>
        </div>
        {/* <p className=" text-base md:text-xl font-medium p-4 mt-6 pb-0 text-center">
          Next rewards released in: 2 hours 54 minutes
        </p> */}
      </div>
      <div className="mt-14">
        <Title title="Stakes & Rewards" />
      </div>
      <div className="overflow-x-auto">
        <div className="mt-20" style={{ width: 1288 }}>
          <div className="grid grid-cols-2 gap-20 px-10">
            <div className="flex items-center justify-between">
              <p className=" font-medium text-lg">Core Pools</p>
              <p className="font-medium text-lg">SHKOOBY Staked</p>
            </div>
            <div className="flex items-center justify-between">
              <p className=" font-medium text-lg">Total Rewards</p>
              <p className=" font-medium text-lg mr-40">Claimable Rewards</p>
              {/* <p className=" font-medium text-lg ">Unlock Time</p> */}
              <p className=" font-medium text-lg"></p>
            </div>
          </div>
          <div className="mt-10">
            {stakesDetails && stakesDetails.map((v, i) => {
  
                const value = reviewData[0];
                // const date = dayjs
                //   .utc(Number(v[2]) * 1000)
                //   .format()
                //   .slice(0, 10);
                // const date2 =
                //   Number(v[2]) === 0
                //     ? "Never"
                //     : dayjs
                //         .utc(Number(v[2]) * 1000)
                //         .format()
                //         .slice(0, 10);
                const stackBalance = v.staked/1000000000000000000;
                const claimableBalance = (v.unClaimed/1000000000000000000).toFixed(0)//Web3.utils.fromWei(v[0][5], "ether");
                const totalRewards = (v.unClaimed/1000000000000000000).toFixed(0)//Web3.utils.fromWei(v[0][3], "ether");

                return (
                  <div
                    className=" bg-dark-500 rounded-md py-6 px-6 grid grid-cols-2 items-center mb-6 gap-20"
                    key={i}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img src={value.img} alt="" />
                        <p className="ml-3 font-semibold  text-lg">
                          <p>
                            {Number(v.id) === 1
                              ? `Flexi Pool`
                              : `Locked Pool ${v.id==2? 30:90} Days`}
                          </p>
                          {/* <p className="text-xs block text-primary">
                            Created: {date}
                          </p> */}
                        </p>
                      </div>
                      <p className="ml-3 font-semibold  text-lg">
                        <p>{stackBalance} SHKOOBY</p>
                      </p>
                    </div>
                    <div className=" flex items-center  justify-between">
                      <p className="text-lg font-semibold">{totalRewards}</p>
                      <p className="text-lg font-semibold">
                        {" "}
                        <p>{claimableBalance}</p>{" "}
                        {/* <p className="text-xs text-primary">
                          Last Claimed: {date2}
                        </p> */}
                      </p>
                      <div className="grid grid-flow-col justify-end">
                        <button
                          className="bg-primary py-2 px-4 rounded-md"
                          onClick={() => claim(v.id)}
                        >
                          Claim 
                        </button>
                        {v.staked>0 && (Number(v.timeIn) + reviewData[v.id-1].timer) < currentTimeinSeconds ?
                        <button

                        className="bg-secondary ml-2 py-2 px-4 rounded-md"

                        onClick={() => unStake(v.id)}
                      >
                        UnStake 
                      </button>: null
                        
                        }
                        
                      </div>
                    </div>
                  </div>
                );
              })}



            {stakesDetails2 && stakesDetails2.map((v, i) => {
              
              const value = reviewData[0];
              // const date = dayjs
              //   .utc(Number(v[2]) * 1000)
              //   .format()
              //   .slice(0, 10);
              // const date2 =
              //   Number(v[2]) === 0
              //     ? "Never"
              //     : dayjs
              //         .utc(Number(v[2]) * 1000)
              //         .format()
              //         .slice(0, 10);
              const stackBalance = v.staked/1000000000000000000;
              const claimableBalance = (v.unClaimed/1000000000000000000).toFixed(0)//Web3.utils.fromWei(v[0][5], "ether");
              const totalRewards = (v.unClaimed/1000000000000000000).toFixed(0)//Web3.utils.fromWei(v[0][3], "ether");

              return (
                <div
                  className=" bg-dark-500 rounded-md py-6 px-6 grid grid-cols-2 items-center mb-6 gap-20"
                  key={i}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img src={value.img} alt="" />
                      <p className="ml-3 font-semibold  text-lg">
                        <p>
                          {Number(v.id) === 1
                            ? `SHK-ETH Flexi Pool`
                            : `SHK-ETH Locked Pool ${v.id==2? 30:90} Days`}
                        </p>
                        {/* <p className="text-xs block text-primary">
                          Created: {date}
                        </p> */}
                      </p>
                    </div>
                    <p className="ml-3 font-semibold  text-lg">
                      <p>{stackBalance} SHK ETH</p>
                    </p>
                  </div>
                  <div className=" flex items-center  justify-between">
                    <p className="text-lg font-semibold">{totalRewards}</p>
                    <p className="text-lg font-semibold">
                      {" "}
                      <p>{claimableBalance}</p>{" "}
                      {/* <p className="text-xs text-primary">
                        Last Claimed: {date2}
                      </p> */}
                    </p>
                    <div className="grid grid-flow-col justify-end">
                      <button
                        className="bg-primary py-2 px-4 rounded-md"
                        onClick={() => claim2(v.id)}
                      >
                        Claim
                      </button>
                      {v.staked>0 && (Number(v.timeIn) + reviewData2[v.id-1].timer) < currentTimeinSeconds ?
                        <button

                        className="bg-secondary ml-2 py-2 px-4 rounded-md"

                        onClick={() => unStake(v.id)}
                      >
                        UnStake 
                      </button>: null
                        
                        }
                    </div>
                  </div>
                </div>
              );
            })}
              
          </div>
        </div>
      </div>
      <InformationModal
        open={transactionRejected}
        setOpen={setTransactionRejected}
        title="Error"
        desc="Transaction Rejected!"
      />
      <InformationModal
        open={transactionFailed}
        setOpen={setTransactionFailed}
        title="Error"
        desc="Transaction Failed!"
      />
      <InformationModal
        open={transactionSuccess}
        setOpen={setransactionSuccess}
        title="Success"
        desc="Transaction Completed Successfully!"
      />
      <InformationModal
        open={lessAmount}
        setOpen={setLessAmount}
        title="Oops"
        desc="Amount Should not be less then 1"
      />

      <ConfirmationModal
        open={confirmTransaction}
        title="Confirm Transaction"
        desc="Please confirm transaction!"
      />
      <ConfirmationModal
        open={transactionInProgress}
        title="Transaction In Progress"
        desc="Please wait to get confirmation of the transaction from blockchain!"
      />
      <ConfirmationModal
        open={confirmTransaction2}
        title="Confirm Transaction"
        desc="Please confirm transaction!"
      />
      <ConfirmationModal
        open={transactionInProgress2}
        title="Transaction In Progress"
        desc="Please wait to get confirmation of the transaction from blockchain!"
      />
    </div>
  );
};

export default Reward;
