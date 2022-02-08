/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Title } from "../../components";
import { MiniButton } from "../../components/button";
import Slogo from "../../assets/images/shkooby_icon.png";
import { StackDetailModal, StackModal } from "../../components";
import { Link } from "react-router-dom";
// import axios from "axios"
const Pools = ({
  poolIds,
  account,
  contract,
  contractAddress2,
  contractAddress,
  contract2,
  loadWeb3,
}) => {
  const [details, setDetails] = useState(false);
  const [flexi, setFlexi] = useState(false);
  const [detailsData, setDetailsData] = useState({});
  const [stack, setStack] = useState(false);
  const [stackId, setStackId] = useState(0);
  const [poolData, setPoolData] = useState([]);
  // console.log(poolData);
  // console.log(poolIds);
  

  useEffect(() => {
    try {
      if (contract) {
        if (poolIds.length > poolData.length) {
          poolIds.forEach(async (element) => {
            const data = await contract.methods
              .getStakePoolDetails(element)
              .call();

            setPoolData((prev) => [...prev, data]);
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, contract, poolIds]);
  // console.log(poolData);
  const poolsData = [
    {
      
      img: Slogo,
      title: "Shkooby Pool",
      btn: [
        {
          type: "outline",
          content: "Details",
        },
        {
          type: "filled",
          content: "Stake",
        },
      ],
    },
    {
      img: Slogo,
      title: "Shkooby Eth Pool",
      btn: [
        {
          type: "outline",
          content: "Details",
        },
        {
          type: "filled",
          content: "Stake",
        },
      ],
    },
    // {
    //   img: Slogo,
    //   title: "6 Months Pool",
    //   btn: [
    //     {
    //       type: "outline",
    //       content: "Details",
    //     },
    //     {
    //       type: "filled",
    //       content: "Stake",
    //     },
    //   ],
    // },
  ];

  return (
    <div className="py-20" id="stack">
      <Title title="Pools" />
      <div className="mt-20 overflow-x-auto">
        <h6 className="font-medium text-lg">Core Pools</h6>
        <div className="mt-8 ">
          {poolsData.length ? (
            poolsData.map((val, index) => {
            
              return (
                <div
                  className="bg-dark-500 rounded-md py-4 px-6 flex-col sm:flex-row flex sm:justify-between sm:items-center mb-6"
                  key={index}
                >
                  <div className="flex items-center mb-5 sm:mb-0">
                    <img src={val.img} alt="" />
                    <p className="font-medium text-lg ml-3">{val.title}</p>
                  </div>
                  <div className="flex items-center ml-5 sm:ml-0">
                    <Link
                      to={`/details${index}/${index}/ ${
                        index === 0 ? "flexi" : "locked"
                      }`}
                    >
                      <MiniButton
                        type={"outline"}
                        // onClick={() => detailsHandler(index, isFlex, val)}
                      >
                        {"Details"}
                      </MiniButton>
                    </Link>
                    <Link to={`stake${index}/1`}>
                      <MiniButton
                        type={"filled"}
                        // onClick={() => stackHandler(index, isFlex, val)}
                      >
                        {"Stake"}
                      </MiniButton>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white bg-opacity-10 shadow rounded-md p-4 w-full mx-auto mb-4 py-20">
               <button
                onClick={loadWeb3}
                className="bg-gray-600 py-3 px-10  rounded-md font-bold mx-auto block "
              >
                Connect Wallet
              </button>
            </div>
          )}
        </div>
      </div>
     
    </div>
  );
};

export default Pools;
