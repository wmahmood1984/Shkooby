/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import "./style.css";
import { PrimaryBtn, SecondaryBtn } from "../button";
import Slider, { SliderTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import FlexiConform from "./FexiConfirm";
import LockedConfirm from "./LockedConfirm";
import InformationModal from "./InformationModal";
import ConfirmationModal from "./ConfirmationModal";
const { Handle } = Slider;
const StackModal = ({
  open,
  setOpen,
  stackId,
  setStackId,
  flex,
  detailsData,
  contractAddress2,
  contractAddress,
  account,
  contract,
  contract2,
}) => {
  const [flexiDetails, setFlexiDetails] = useState(false);
  const [lockedDetails, setLockedDetails] = useState(false);
  const [value, setValue] = useState(0);
  const [flexiValue, setFlexiValue] = useState(null);
  const [lockedValue, setLockedValue] = useState(null);
  const [approved, setApproved] = useState(false);
  const [transactionRejected, setTransactionRejected] = useState(false);
  const [transactionFailed, setTransactionFailed] = useState(false);
  const [confirmTransaction, setConfirmTransaction] = useState(false);
  const [transactionInProgress, setransactionInProgress] = useState(false);
  const [confirmTransaction2, setConfirmTransaction2] = useState(false);
  const [transactionInProgress2, setransactionInProgress2] = useState(false);
  const [transactionSuccess, setransactionSuccess] = useState(false);
  const modalRef = useRef();

  const poolId = detailsData ? (detailsData[2] ? detailsData[2][0] : 0) : 0;
  // console.log(detailsData);
  // APPROVE FUNCTION👇
  const approveHandler = async () => {
    console.log("call", contract2, contractAddress);
    if (contract2) {
      setConfirmTransaction(true);
      window.localStorage.setItem("approving", "true");

      contract2.methods
        .approve(contractAddress, 10000000)
        .send({ from: account })
        .on("transactionHash", async function (response) {
          setConfirmTransaction(false);
          // setListApprove(true);
          setransactionInProgress(true);
        })
        .on("confirmation", function () {
          // setListNftApproved(true);
          setConfirmTransaction(false);
          setransactionInProgress(false);
          // setListApprove(false);
          // setApprove(true);
          // setListNftApproved(false);
          setApproved(true);
          // setransactionSuccess(true);
          window.localStorage.removeItem("approving");
        })
        .on("error", function (error, receipt) {
          window.localStorage.removeItem("approving");
          if (error.code === 4001) {
            setTransactionRejected(true);
            setConfirmTransaction(false);
            // setListApprove(false);
          } else {
            setTransactionFailed(true);
            setConfirmTransaction(false);
            // setListApprove(false);
          }
        });
    }
  };
  // APPROVE FUNCTION👆

  //STAKE FUNCTION👇
  const stakingHandler = async () => {
    // console.log("call", contract2, contractAddress);
    if (contract) {
      setConfirmTransaction2(true);
      window.localStorage.setItem("approving", "true");
      contract.methods
        .stake(poolId, Number(flexiValue))
        .send({ from: account })
        .on("transactionHash", async function (response) {
          setConfirmTransaction2(false);

          setransactionInProgress2(true);
        })
        .on("confirmation", function () {
          const el = document.createElement("div");
          el.innerHTML =
            "View minted NFT on OpenSea : <a href='https://testnets.opensea.io/account '>View Now</a>";

          // setListNftApproved(true);
          setConfirmTransaction2(false);

          setransactionInProgress2(false);
          // setApproved(true);
          setransactionSuccess(true);
          window.localStorage.removeItem("approving");
          // setransactionSuccess();
        })
        .on("error", function (error, receipt) {
          window.localStorage.removeItem("approving");
          if (error.code === 4001) {
            setTransactionRejected(true);
            setConfirmTransaction(false);
            // setListApprove(false);
          } else {
            setTransactionFailed(true);
            setConfirmTransaction(false);
            // setListApprove(false);
          }
        });
    }
  };

  //STAKE FUNCTION👆

  const flexiValueHandler = (e) => {
    setFlexiValue(e.target.value);
    console.log(typeof flexiValue);
  };
  const lockedValueHandler = (e) => {
    setLockedValue(e.target.value);
    console.log(flexiDetails);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!modalRef.current.contains(e.target)) {
        const approving = window.localStorage.getItem("approving");
        // console.log(approving);
        if (approving !== "true") {
          setOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeHandler = (i) => {
    setStackId(i);
  };
  const stakeHandler = (stackId) => {
    setOpen((prev) => !prev);
    if (stackId === 0) {
      setFlexiDetails((prev) => !prev);
    } else if (stackId === 1) {
      setLockedDetails((prev) => !prev);
    }
  };
  const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    setValue(value);
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
    <>
      <div className={`modal stack ${open ? "active" : ""}`}>
        <div className="modal-content-wrapper">
          <div className="container">
            <div className="modal-wrapper" ref={modalRef}>
              <h1 className=" text-left font-bold text-xl md:text-3xl mt-0">
                {detailsData
                  ? detailsData[2]
                    ? Number(detailsData[2][1]) === 0
                      ? "Flexi Pool"
                      : `Locked Pool ${Number(detailsData[2][1])} Days`
                    : 0
                  : 0}
              </h1>

              {detailsData &&
              detailsData[2] &&
              Number(detailsData[2][1]) === 0 ? (
                <Flexible
                  handler={() => stakeHandler(stackId)}
                  detailsData={detailsData}
                  flexiValue={flexiValue}
                  setFlexiValue={setFlexiValue}
                  inputHandler={flexiValueHandler}
                  approved={approved}
                  approveHandler={approveHandler}
                  stakingHandler={stakingHandler}
                />
              ) : (
                <Locked
                  handler={() => stakeHandler(stackId)}
                  handle={handle}
                  value={value}
                  detailsData={detailsData}
                  lockedValue={flexiValue}
                  setLockedValue={setLockedValue}
                  inputHandler={flexiValueHandler}
                  approved={approved}
                  approveHandler={approveHandler}
                  stakingHandler={stakingHandler}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <FlexiConform open={flexiDetails} setOpen={setFlexiDetails} />
      <LockedConfirm open={lockedDetails} setOpen={setLockedDetails} />
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
    </>
  );
};

export default StackModal;

const StackInput = ({ vale, setValue, handler }) => (
  <form action="" onSubmit={(e) => e.preventDefault()}>
    <div className="stack-input-wrapper">
      <label>Amount ( Account Balance : 100 SHKOOBY)</label>
      <div className="stack-input">
        <input
          type="text"
          placeholder="Enter SHKOOBY to be staked"
          value={vale}
          onChange={handler}
        />
        <button className="input-btn pointer-events-none">Max</button>
      </div>
    </div>
  </form>
);

const Flexible = ({
  approveHandler,
  handler,
  detailsData,
  flexiValue,
  setFlexiValue,
  inputHandler,
  approved,
  stakingHandler,
}) => (
  <>
    <div className="flex justify-start items-center mb-4 mt-8 md:mb-6">
      <p>
        Lock For:{" "}
        <span className="font-medium">
          {" "}
          {detailsData
            ? detailsData[2]
              ? Number(detailsData[2][1])
              : 0
            : 0}{" "}
          Days
        </span>
      </p>
      <span className="inline-block mx-2">|</span>
      <p>
        APY Multiplier:{" "}
        <span className="font-medium">
          {" "}
          {detailsData
            ? detailsData[2]
              ? Number(detailsData[2][3]) / 100
              : 0
            : 0}
        </span>
      </p>
    </div>
    {/* <p className="mt-8 mb-4 font-semibold  text-sm md:text-lg">
      Balance: $25.0 SHKOOBY
    </p> */}
    <StackInput value={flexiValue} handler={inputHandler} />
    <p className="text-left text-base my-4">
      Est. APR:{" "}
      {detailsData ? (detailsData[2] ? Number(detailsData[2][2]) / 100 : 0) : 0}
      %
    </p>
    <div className="p-2 md:py-4  px-4 bg-red text-red rounded-xl text-xs ">
      <p className="md:mx-20">
        Shkooby Inu strives to offer its holders the heighest levels of DeFi
        project-on-chain contract security, however you must be aware that there
        are always risks associated with staking contracts and you assume all
        associated responsibility
      </p>
    </div>
    <div className="mt-10  grid  grid-flow-col gap-x-3 justify-center">
      <button
        className={`${
          approved ? "bg-gray-500 pointer-events-none" : "bg-secondary "
        }  py-2 px-6 rounded-md font-bold uppercase text-lg`}
        onClick={approveHandler}
      >
        Approve
      </button>
      <button
        className={`${
          !approved ? "bg-gray-500 pointer-events-none" : "bg-primary "
        } py-2 px-10 rounded-md font-bold uppercase text-lg`}
        onClick={stakingHandler}
      >
        Stake
      </button>
    </div>
  </>
);
const Locked = ({
  handler,
  handle,
  value,
  detailsData,
  lockedValue,
  setLockedValue,
  inputHandler,
  approved,
  approveHandler,
  stakingHandler,
}) => (
  <>
    <div className="mb-4 mt-10">
      <div className="flex justify-start items-center mb-4 md:mb-6">
        <p>
          Lock For:{" "}
          <span className="font-medium">
            {" "}
            {detailsData
              ? detailsData[2]
                ? Number(detailsData[2][1])
                : 0
              : 0}{" "}
            Days
          </span>
        </p>
        <span className="inline-block mx-2">|</span>
        <p>
          APY Multiplier:{" "}
          <span className="font-medium">
            {detailsData
              ? detailsData[2]
                ? Number(detailsData[2][3]) / 100
                : 0
              : 0}
          </span>
        </p>
      </div>
      {/* <Slider min={1} max={6} defaultValue={0} handle={handle} /> */}
    </div>
    {/* <p className="mt-4 mb-4 font-semibold text-lg">Balance: $25.0</p> */}
    <StackInput
      value={lockedValue}
      setValue={setLockedValue}
      handler={inputHandler}
    />
    <p className="text-left text-base my-4">
      Est. APR:{" "}
      {detailsData ? (detailsData[2] ? Number(detailsData[2][2]) / 100 : 0) : 0}
      %
    </p>
    <div className="p-2 md:py-4  px-4 bg-red text-red rounded-xl text-xs">
      <p className="md:mx-20">
        Shkooby Inu strives to offer its holders the heighest levels of DeFi
        project-on-chain contract security, however you must be aware that there
        are always risks associated with staking contracts and you assume all
        associated responsibility
      </p>
    </div>

    <div className="mt-10  grid  grid-flow-col gap-x-3 justify-center">
      <button
        className={`${
          approved ? "bg-gray-500 pointer-events-none" : "bg-secondary "
        }  py-2 px-6 rounded-md font-bold uppercase text-lg`}
        onClick={approveHandler}
      >
        Approve
      </button>
      <button
        className={`${
          !approved ? "bg-gray-500 pointer-events-none" : "bg-primary "
        } py-2 px-10 rounded-md font-bold uppercase text-lg`}
        onClick={stakingHandler}
      >
        Stake
      </button>
    </div>
  </>
);
