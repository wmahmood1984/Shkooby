/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { PrimaryBtn } from "../components/button";
import { Link, useParams } from "react-router-dom";
import Slider, { SliderTooltip } from "rc-slider";
import InformationModal from "../components/modals/InformationModal";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import "rc-slider/assets/index.css";
import Web3 from "web3";
import { useDispatch, useSelector } from 'react-redux';
import { Approve, Staking } from "../state/ui";
import { initWeb3 } from "../state/ui/index";
import { toast } from "react-toastify";
const { Handle } = Slider;
const Stake = ({
  contract,
  contract2,
  contractAddress,
  contractAddress2,
  poolIds,
  account,
}) => {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [balance, setBalance] = useState(0);
 // const [approved, setApproved] = useState(false);
  const [transactionRejected, setTransactionRejected] = useState(false);
  const [transactionFailed, setTransactionFailed] = useState(false);
  const [confirmTransaction, setConfirmTransaction] = useState(false);
  const [transactionInProgress, setransactionInProgress] = useState(false);
  const [confirmTransaction2, setConfirmTransaction2] = useState(false);
  const [transactionInProgress2, setransactionInProgress2] = useState(false);
  const [transactionSuccess, setransactionSuccess] = useState(false);
  const [lessAmount, setLessAmount] = useState(false);
  const [stackValue, setStackValue] = useState(0);
  // const [stakeDetails, setStakeDetails] = useState([]);
  // const [flexiDetails, setFlexiDetails] = useState({});
  // const [lockedDetails, setLockedDetails] = useState([]);
  const dispatch = useDispatch()
  const approved = useSelector((state)=>{
    return Number(state.adoptReducer.approved)/1000000000000000000;
  });

  const toggle = useSelector((state)=>{
    return state.adoptReducer.toggle;
  });



  useEffect(() => {
 
      dispatch(initWeb3())
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approved,toggle]);

  const pending = useSelector((state)=>{
    return state.adoptReducer.pending;
  });


  const APY = useSelector((state)=>{
    return state.adoptReducer.APY;
  });


  const tokenBalance = useSelector((state)=>{
    return Number(state.adoptReducer.tokenBalance)/1000000000000000000;
  });





  // const []
  // const [staticStackDetails, setStaticStakeDetails] = useState({});

  // const staticStakeDetails = [
  //   {
  //     id: poolIds[0],
  //     days: "0",
  //     apr: "720",
  //     poolWeight: "20",
  //   },
  //   {
  //     id: poolIds[1],
  //     days: "30",
  //     apr: "1080",
  //     poolWeight: "30",
  //   },
  //   {
  //     id: poolIds[2],
  //     days: "90",
  //     apr: "1440",
  //     poolWeight: "40",
  //   },
  //   {
  //     id: poolIds[3],
  //     days: "180",
  //     apr: "1800",
  //     poolWeight: "50",
  //   },
  //   {
  //     id: poolIds[4],
  //     days: "360",
  //     apr: "1800",
  //     poolWeight: "60",
  //   },
  // ];
  

  const stakeFlexiDetails = {
    id: 1,
    days: "0",
    apr: `${Number(APY)}`,
    poolWeight: "20",
  };
  // setFlexiDetails(stakeFlexiDetails);
  const stakeLockedDetails = [
    {
      id: 2,
      days: "30",
      apr: `${Number(APY)*1.5}`,
      poolWeight: "30",
    },
    {
      id: 3,
      days: "90",
      apr: `${Number(APY)*2}`,
      poolWeight: "40",
    }
  ];
  // console.log(stakeLockedDetails[0].days);
  // setLockedDetails(stakeLockedDetails);
  // console.log(staticStakeDetails);
  // useEffect(() => {
  //   const getDetail = async () => {
  //     try {
  //       if (contract) {
  //         // console.log(stakeDetails.length < poolIds.length);
  //         poolIds.forEach(async (element) => {
  //           const data = await contract.methods
  //             .getStakePoolDetails(element)
  //             .call();
  //           // console.log(data);
  //           setStakeDetails((prev) => [...prev, data]);
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   console.log(stakeDetails.length < poolIds.length);
  //   if (stakeDetails.length < poolIds.length) {
  //     console.log(stakeDetails.length < poolIds.length);
  //     getDetail();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [poolIds]);

  // console.log(stakeDetails);
  // APPROVE FUNCTION👇
  // const approveHandler = async () => {
  //   // console.log("call", contract2, contractAddress);
  //   if (contract2) {
  //     setConfirmTransaction(true);
  //     //   window.localStorage.setItem("approving", "true");

  //     contract2.methods
  //       .approve(contractAddress, "1000000000000000000000000")
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
  //         setApproved(true);
  //         // setransactionSuccess(true);
  //         //   window.localStorage.removeItem("approving");
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
  // APPROVE FUNCTION👆

  const approveHandler = ()=>{
    console.log("Approval function")
    dispatch(Approve({quantity:stackValue}))
    setStackValue("")
  }

  const stakingHandler = (stakeId)=>{
    console.log("staking id in function",stakeId)
    dispatch(Staking({quantity: stackValue, stakeId}))
    setStackValue("")
  }

  //STAKE FUNCTION👇
  // const stakingHandler = async (stakeId) => {
  //   // console.log("call", contract2, contractAddress);
  //   console.log(stackValue);
  //   if (Number(stackValue) > 1) {
  //     if (contract) {
  //       setConfirmTransaction2(true);
  //       // window.localStorage.setItem("approving", "true");
  //       const value = Web3.utils.toWei(stackValue, "ether");
  //       // console.log("stakValue:", value);
  //       contract.methods
  //         .stake(stakeId, value)
  //         .send({ from: account })
  //         .on("transactionHash", async function (response) {
  //           setConfirmTransaction2(false);

  //           setransactionInProgress2(true);
  //         })
  //         .on("confirmation", function () {
  //           // setListNftApproved(true);
  //           setConfirmTransaction2(false);

  //           setransactionInProgress2(false);
  //           // setApproved(true);
  //           setransactionSuccess(true);
  //           // window.localStorage.removeItem("approving");
  //           // setransactionSuccess();
  //         })
  //         .on("error", function (error, receipt) {
  //           window.localStorage.removeItem("approving");
  //           if (error.code === 4001) {
  //             setTransactionRejected(true);
  //             setConfirmTransaction(false);
  //             // setListApprove(false);
  //           } else {
  //             setTransactionFailed(true);
  //             setConfirmTransaction(false);
  //             // setListApprove(false);
  //           }
  //         });
  //     }
  //   } else {
  //     setLessAmount(true);
  //   }
  // };

  // STAKING BUTTON HANDLER 👇
  const stakingBtnHandler = (stakeId) => {
  if(stackValue < 1){
    toast("Value cannot be less than 1", {
      type: "error",
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }else {
    if (approved >= stackValue) {
      stakingHandler(stakeId);
    } else {
      approveHandler();
    }
  }
      



  };

  // STAKING BUTTON HANDLER 👆

  // GET BALANCE AND CHECK APPROVAL 👇
  // useEffect(() => {
  //   // const getDetail = async () => {
  //   //   try {
  //   //     if (contract2) {
  //   //       const data = await contract2.methods.balanceOf(account).call();
  //   //       //   setDetails(data[2]);
  //   //       const convertedData = Web3.utils.fromWei(data, "ether");
  //   //       // console.log(convertedData);
  //   //       setBalance(convertedData);
  //   //     }
  //   //   } catch (error) {
  //   //     console.log(error);
  //   //   }
  //   // };
  //   // getDetail();
  //   // // const checkApproval = async () => {
  //   //   try {
  //   //     if (contract2) {
  //   //       const data = await contract2.methods
  //   //         .allowance(account, contractAddress)
  //   //         .call();
  //   //       //   setDetails(data[2]);
  //   //       //   const convertedData = Web3.utils.fromWei(data, "ether");
  //   //       // console.log(data);
  //   //       if (Number(data) > 0) {
  //   //         // console.log("approved");
  //   //         setApproved(true);
  //   //       } else {
  //   //         // console.log("not approved");
  //   //         setApproved(false);
  //   //       }
  //   //     }
  //   //   } catch (error) {
  //   //     console.log(error);
  //   //   }
  //   // };
  //   // checkApproval();
  // }, [account]);
  // // GET BALANCE AND CHECK APPROVAL 👆

  window.ethereum.on("accountsChanged", (account) => {
    window.location.reload();
  });

  const inputHandler = (e) => {
    if(stackValue > tokenBalance){
      toast("You dont have enough tokens to stake", {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
setStackValue(e.target.value);
    
  };

  const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    setValue(value);
    // console.log(value - 1);
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value}`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };


  return (
    <div>
      <div className="container">
        <div
          className=" max-w-xl w-full mx-auto bg-dark-500 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
          // ref={modalRef}
        >
          <h1 className=" text-left font-bold text-xl md:text-3xl mt-0">
            SHKOOBY
          </h1>

          <div className=" grid grid-cols-2 mt-5">
            {["Flexi Pool", "Locked Pool"].map((v, i) => (
              <button
                className={`${
                  currentValue === i ? "bg-primary" : "bg-dark-700"
                } border-b-2 border-primary py-2 md:py-4 font-semibold text-sm md:text-xl transition-all`}
                key={i}
                onClick={() => setCurrentValue(i)}
              >
                {v}
              </button>
            ))}
          </div>
          {currentValue === 0 ? (
            <Flexible
              handler={stakingBtnHandler}
              balance={balance}
              stackValue={stackValue}
              inputHandler={inputHandler}
              approved={approved}
              poolData={stakeFlexiDetails}
              tokenBalance = {tokenBalance}
            />
          ) : (
            <Locked
              handler={stakingBtnHandler}
              handle={handle}
              value={value}
              balance={balance}
              stackValue={stackValue}
              inputHandler={inputHandler}
              approved={approved}
              poolData={stakeLockedDetails}
              tokenBalance = {tokenBalance}
            />
          )}
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
        open={pending}
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

export default Stake;

const StackInput = ({ stackValue, inputHandler }) => (
  <form action="" onSubmit={(e) => e.preventDefault()}>
    <div className="stack-input-wrapper">
      <label>Amount</label>
      <div className="stack-input">
        <input
          type="text"
          placeholder="Enter SHKOOBY to be staked"
          value={stackValue}
          onChange={inputHandler}
        />
        <button className="input-btn">Max</button>
      </div>
    </div>
  </form>
);

const Flexible = ({
  handler,
  balance,
  stackValue,
  inputHandler,
  approved,
  poolData,
  tokenBalance
}) => {

  console.log("approved",approved)
  console.log("stack value", stackValue)
  console.log("token Balance",tokenBalance)
  
  // console.log(poolData.id);
  return (
    <>
      <p className="mt-8 mb-4 font-semibold  text-sm md:text-lg">
        Balance: {Number(tokenBalance).toFixed(2)} SHKOOBY
      </p>
      <StackInput stackValue={stackValue} inputHandler={inputHandler} />
      <p className="text-left text-base my-4">
        Est. APR: {Number(poolData.apr) }%
      </p>
      <div className="p-2 md:py-4  px-4 bg-red text-red rounded-xl text-xs ">
        <p className="md:mx-10 text-center">
          Shkooby Inu strives to offer its holders the heighest levels of DeFi
          project-on-chain contract security, however you must be aware that
          there are always risks associated with staking contracts and you
          assume all associated responsibility
        </p>
      </div>
      <div className="mt-10 primary-btn text-center">
        <button
          className="bg-primary font-bold text-xl py-2 px-8 w-full rounded-full"
          disabled={stackValue > tokenBalance}     
          onClick={() => handler(poolData.id)}
        >
          {stackValue==0? "Enter value" :  approved >= stackValue ? "Stake" : "Approve"}
        </button>
      </div>
    </>
  );
};
const Locked = ({
  handler,
  handle,
  value,
  balance,
  stackValue,
  inputHandler,
  approved,
  poolData,
  tokenBalance
}) => {
  // console.log(poolData[count]?.days);
  const count = value - 1;
  const days = poolData[count]?.days;
  const weight = poolData[count]?.poolWeight;
  const apr = poolData[count]?.apr;
  const stakeId = poolData[count]?.id;

  return (
    <>
      <div className="mb-4 mt-10">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <p>
            Lock For: <span className="font-medium">{days} Days</span>
          </p>
          <p>
            Weight: <span className="font-medium">{Number(weight) / 100}</span>
          </p>
        </div>
        <Slider min={1} max={2} defaultValue={1} handle={handle} />
      </div>
      <p className="mt-4 mb-4 font-semibold text-lg">
        {" "}
        Balance: {Number(tokenBalance).toFixed(2)} SHKOOBY
      </p>
      <StackInput stackValue={stackValue} inputHandler={inputHandler} />
      <p className="text-left text-base my-4">Est. APR: {Number(apr)}%</p>
      <div className="p-2 md:py-4  px-4 bg-red text-red rounded-xl text-xs">
        <p className="md:mx-10 text-center">
          Shkooby Inu strives to offer its holders the heighest levels of DeFi
          project-on-chain contract security, however you must be aware that
          there are always risks associated with staking contracts and you
          assume all associated responsibility
        </p>
      </div>
      <div className="mt-6 md:mt-10 primary-btn">
        <button
          disabled={stackValue > tokenBalance}
          className="bg-primary font-bold text-xl py-2 px-8 w-full rounded-full"
          onClick={() => handler(stakeId)}
        >
          {stackValue==0? "Enter value" :  approved >= stackValue ? "Stake" : "Approve"}
        </button>
      </div>
    </>
  );
};
