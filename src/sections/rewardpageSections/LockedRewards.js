/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Title } from "../../components";
import Slogo from "../../assets/images/shkooby_icon.png";
import Web3 from "web3";
import * as dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Timer from "./Timer";
import { useDispatch, useSelector } from 'react-redux';
const lockedRewardData = [
  {
    name: "SHKOOBY",
    img: Slogo,
    amount: "$31.5",
    value: "$45",
    status: "Pending",
    timeRemain: "5 Days 2 hr",
  },
];

const LockedRewards = ({
  contract,
  contract2,
  contractAddress,
  contractAddress2,
  account,
}) => {
  const [lockedRewardList, setLockedRewardList] = useState([]);
  // const [days, setDays] = useState(0);
  // const [hours, setHours] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);
  const lockReward = useSelector((state)=>{
    // var abc = []
    // for(var i = 0; i <3;i++){
    //   if(state.adoptReducer.UserDetails && state.adoptReducer.UserDetails[i]>0){
    //     abc.push({id: i+1,val:state.adoptReducer.UserDetails[i]})
    //   }
    // }
    return state.adoptReducer.lockreward;
  });

  console.log("lock reward ", lockReward)
  useEffect(() => {
    const getData = async () => {
      try {
        const ids = await contract.methods
          .getUserLockedRewardIds()
          .call({ from: account });
        console.log("reawrd Ids", ids);
        if (lockedRewardList.length < ids.length) {
          ids.forEach(async (element) => {
            const details = await contract.methods
              .getUserLockedRewardDetails(element)
              .call();
            console.log("details", details);
            setLockedRewardList((prev) => [...prev, details]);
          });
        }
      } catch (error) {}
    };
    getData();
  }, [account, contract, lockedRewardList]);
  // const difference =
  //   +dayjs.utc("2021-11-04T13:00:00.000+0000", "YYYY-MM-DDTHH:mm:ss.000ZZ") -
  //   +new Date();

  // useEffect(() => {
  //   const id = setTimeout(() => {
  //     if (difference > 0) {
  //       setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
  //       setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
  //       setMinutes(Math.floor((difference / 1000 / 60) % 60));
  //       setSeconds(Math.floor((difference / 1000) % 60));
  //     }
  //   }, 1000);

  //   return () => {
  //     clearTimeout(id);
  //   };
  // });
  return (
    <div className="py-10">
      <Title title="Locked Rewards" />
      <div className="overflow-x-auto">
        <div className="" style={{ width: 1288 }}>
          <div className="grid grid-cols-12 gap-10  px-6 mt-20">
            <div className="col-span-3">
              <p className="text-lg font-medium">Token</p>
            </div>
            <div className="flex justify-between items-center col-span-3">
              <p className="text-lg font-medium ">Amount</p>
              <p className="text-lg font-medium">Dollar Value</p>
            </div>
            <div className="flex justify-evenly items-center col-span-6">
              <p className="text-lg font-medium">Status</p>
              <p className="text-lg font-medium">Time Remaining</p>
            </div>
          </div>
          <div className="mt-10">
            {lockReward && lockReward.map((v, i) => {
              const val = lockedRewardData[0];
              const amount = (v.reward/1000000000000000000).toFixed(0);
              const dollarValue = Number(amount) * 0.00000001727;
              const status =
                Number(v[0][3]) === 0
                  ? "Pending"
                  : Number(v[0][3]) === 1
                  ? "Claimed"
                  : "UnKnown";

              const time = Number(v.timeOut);
              console.log(time);
              return (
                <div
                  className=" bg-dark-500 rounded-md py-6 px-6 grid grid-cols-12 items-center mb-6 gap-10"
                  key={i}
                >
                  <div className="flex items-center col-span-3">
                    <img src={val.img} alt="" />
                    <p className="ml-3 font-semibold  text-lg">{val.name}</p>
                  </div>
                  <div className="flex justify-between items-center col-span-3">
                    <p className="ml-3 font-semibold  text-lg">{amount}</p>
                    <p className="ml-3 font-semibold  text-lg">
                      $ {dollarValue.toFixed(6)}
                    </p>
                  </div>
                  <div className=" flex items-center  justify-evenly col-span-6">
                    <p className="text-lg font-semibold">{status}</p>
                    <p className="text-lg font-semibold">
                      {" "}
                      <Timer time={time} />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockedRewards;
