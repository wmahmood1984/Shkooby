/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PrimaryBtn } from "../components/button";
import { useDispatch, useSelector } from 'react-redux';
const Details2 = ({
  contract,
  contract2,
  contractAddress,
  contractAddress2,
  poolIds,
  account,
}) => {
  const { id, type } = useParams();
  const [details, setDetails] = useState({});
  console.log("type", type);
  console.log("address", contractAddress2);
  
  const claimedReward = useSelector((state)=>{
    return state.adoptReducer.claimedReward2;
  });


  const totalStaked = useSelector((state)=>{
   
    
    return state.adoptReducer.totalStaked2;
  });


  const totalClaimed = useSelector((state)=>{
   
    
    return state.adoptReducer.totalClaimed2;
  });



  const stakedBalance = useSelector((state)=>{
    

    var total = Number(state.adoptReducer.balance12) + Number(state.adoptReducer.balance22) + Number(state.adoptReducer.balance32) 
    
    return total
  });



  const address = useSelector((state)=>{
    return state.adoptReducer.address;
  });





  const web3 = useSelector( (state)=>{
    return state.adoptReducer.web3;
    
  });
  
  const APY = useSelector( (state)=>{
    return state.adoptReducer.APY2;
    
  });

//   var lockedRewardofAccount = lockedRewardFetched.filter(item=>item.claimer==address)
//   var amounts = lockedRewardofAccount.map(transaction => web3.utils.fromWei(transaction.reward,"ether") );
//   var total = amounts.reduce((acc,item) => (acc+=Number(item)),0).toFixed(0);
// console.log("amounts",total)

  useEffect(() => {
    // const getDetail = async () => {
    //   try {
    //     if (contract) {
    //       const data = await contract.methods.getStakePoolDetails(id).call();

    //       // console.log(details);
    //       // console.log("address", contractAddress2);

    //       const data2 = await contract.methods
    //         .getFlexyPoolDetails(contractAddress2)
    //         .call();
    //       console.log("d2", data2);
    //       const data3 = await contract.methods
    //         .getLockedPoolsDetails(contractAddress2)
    //         .call();
    //       console.log("d3", data3);
    //       if (type === "flexi") {
    //         setDetails(data2);
    //       } else {
    //         setDetails(data3);
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, contract]);

  const data = [
    {
      title: "Stake Pool",
      result: `${type === "flexi" ? "Flexi Pool" : "Locked Pool"}`,
    },
    {
      title: "Lock Duration",
      result: `${type === "flexi" ? "0" : "30 - 360"} Days`,
    },
    {
      title: "Total Claimed Rewards",
      result: `${(claimedReward/1000000000000000000).toFixed(0)} SHKOOBY`,
    },
    {
      title: "Total Locked Rewards",
      result: `${0} SHKOOBY`,
    },
    {
      title: "Pool Weight",
      result: `${100} %`,
    },
    {
      title: "Pool APR",
      result: `${0} %`,
    },
  ];




  return (
    <div>
      <>
        <div className="container">
          <div className=" max-w-2xl mx-auto bg-dark-500 p-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="border-b border-primary pb-3 flex justify-between items-center">
              <h1 className=" text-left font-bold text-3xl mt-0">SHKOOBY</h1>
              {/* <div className="py-3 px-5 rounded-lg font-bold bg-dark-700">
                {/* {account
                  ? account.slice(0, 6) +
                    "..." +
                    account.slice(account.length - 6, account.length)
                  : "Connect Wallet"} 
              </div> */}
            </div>
            <h2 className="font-semibold text-3xl text-primary text-left my-4">
              Details
            </h2>
            <div className="my-10">
              <ul>
                {
                  <li
                    className={`grid grid-cols-2 gap-2 `}
                    
                  >
                    <div className=" text-left">
                      <p className=" text-sm sm:text-base">TVL : {totalStaked && (Number(totalStaked))/1000000000000000000} SHKOOBY</p><br/>
                    </div>
                    <div className=" text-left">
                      <p className=" text-sm sm:text-base">Rewards Claimed : {totalClaimed && ((Number(totalClaimed))/1000000000000000000).toFixed(0)}</p>
                    </div>
                    <div className=" text-left">
                      <p className=" text-sm sm:text-base">Avg APR: {APY && APY/10000}%</p>
                    </div>

                    <div className=" text-left">
                      <p className="font-medium text-sm sm:text-base">
                        My Liquidity : {stakedBalance/1000000000000000000}
                      </p><br/>
                    </div>
                  </li>
                }
              </ul>
            </div>
            <div className="mt-10 text-center">
              <Link to={`/stake1/${id}`} className="  primary-btn ">
                <PrimaryBtn>Stake</PrimaryBtn>
              </Link>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Details2;
