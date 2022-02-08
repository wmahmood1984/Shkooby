// /* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Title } from "../../components";
import { LightButton, PrimaryBtn, SecondaryBtn } from "../../components/button";
import axios from "axios";
import Chart from "react-apexcharts";
import dayjs from "dayjs";
import Web3 from "web3";
import utc from "dayjs/plugin/utc";
import { useDispatch, useSelector } from 'react-redux';

dayjs().format();
const Overview = ({ setStackOpen, stakeOpen, account, contract, loadWeb3 }) => {
  const [prices, setPrices] = useState([]);
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalClaimed, setTotalClaimed] = useState(0);
  const [userStakedBalance, setUserStakedBalance] = useState(0);
  const [userUnClaimedBalance, setUserUnClaimedBalance] = useState(0);
  
  const stakedBalance = useSelector((state)=>{
    

    var total = Number(state.adoptReducer.balance1) + Number(state.adoptReducer.balance2) + Number(state.adoptReducer.balance3) 
    
    return total
  });


  const stakedBalance2 = useSelector((state)=>{
    

    var total = Number(state.adoptReducer.balance12) + Number(state.adoptReducer.balance22) + Number(state.adoptReducer.balance32) 
    
    return total
  });

  console.log("balance",stakedBalance)


  const unClaimed = useSelector((state)=>{
    

    var total = Number(state.adoptReducer.unClaimedReward1) + Number(state.adoptReducer.unClaimedReward2) + Number(state.adoptReducer.unClaimedReward3) 
    
    return total
  });

  const unClaimed2 = useSelector((state)=>{
    

    var total = Number(state.adoptReducer.unClaimedReward12) + Number(state.adoptReducer.unClaimedReward2) + Number(state.adoptReducer.unClaimedReward32) 
    
    return total
  });

  const totalStaked1 = useSelector((state)=>{
    return state.adoptReducer.totalStaked;
  });

  const totalClaimed1 = useSelector((state)=>{
    return state.adoptReducer.totalClaimed;
  });


  

  // const [data,setData] =

  // useEffect(() => {
  //   const getStakeData = async () => {
  //     if (contract) {
  //       try {
  //         const amountStaked = await contract.methods
  //           .totalStakedBalance()
  //           .call();
  //         const amountClaimed = await contract.methods
  //           .totalClaimedLockedBalance()
  //           .call();
  //         const convertedStakedValue = Web3.utils.fromWei(amountStaked);
  //         const convertedAmountClamied = Web3.utils.fromWei(amountClaimed);
  //         setTotalStaked(convertedStakedValue);
  //         setTotalClaimed(convertedAmountClamied);

  //         const userDetails = await contract.methods
  //           .getUserDetails()
  //           .call({ from: account });
  //         console.log(userDetails);
  //         setUserStakedBalance(Web3.utils.fromWei(userDetails[1]));
  //         setUserUnClaimedBalance(Web3.utils.fromWei(userDetails[3]));
  //         // console.log("amount", amountClaimed);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };
  //   getStakeData();
  // }, [account, contract]);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
  //       );

  //       setPrices(data.prices);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // console.log(p);
  const options = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false,
      },
    },
    colors: ["#0DC5AB"],
    grid: {
      show: false,
    },
    theme: {
      mode: "dark",
    },

    xaxis: {
      categories: prices.map((coin) => {
        const date = dayjs.utc(coin[0]).format();
        return date;
      }),
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      title: {
        style: {
          color: "#010101",
        },
      },
      tooltip: {
        enabled: false,
      },
      crosshars: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      axisBorder: {
        show: false,
      },
    },
  };
  const series = [
    {
      name: "Bitcoin Price",
      data: prices.map((coin) => coin[1]),
    },
  ];
  dayjs.extend(utc);
  const date = dayjs.utc(1318781876 * 100).format();
  function numberWithCommas2(x) {
    var y = x.toFixed(2)
  return y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").slice(0, 10);
}
  
  // console.log(date);
  return (
    <div>
      <div className="bg-dark-500 py-10 px-4">
        <Title desc="Stake $Shkooby in one of our two core pools to start earning rewards." />
        <div className="grid grid-cols-1 gap-10 sm:gap-0 sm:grid-cols-2 md:mx-20  xl:mx-60 mt-10">
          <OverviewContent
            price={`SHKOOBY ${(stakedBalance/1000000000000000000).toFixed(0)}`}
            price2={`SHK-ETH ${(stakedBalance2/1000000000000000000).toFixed(0)}`}
            account={account}
            loadWeb3={loadWeb3}
          />
          <OverviewContent
            title="YOUR UNCLAIMED REWARDS"
            price={`SHKOOBY ${(unClaimed/1000000000000000000).toFixed(0)}`}
            price2={`SHKOOBY ${(unClaimed2/1000000000000000000).toFixed(0)}`}
            btn="secondary"
            btnText="Claim"
            disable={true}
            account={account}
            loadWeb3={loadWeb3}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-20 gap-6">
        <div className="row-span-2 bg-dark-600 p-4 md:p-8">
          <Chart options={options} series={series} type="line" />
        </div>
        <div className="p-8 bg-dark-600 text-center  grid items-center justify-center">
          <h6 className="font-semibold md:text-2xl mb-4">
            Total Amount Staked
          </h6>
          <LightButton type="primary">{(totalStaked1/1000000000000000000).toFixed(0)} SHKOOBY</LightButton>
        </div>
        <div className="p-8 bg-dark-600 text-center grid items-center justify-center">
          <h6 className="font-semibold text-2xl mb-4">Total Amount Claimed</h6>
          <LightButton type="secondary">{(totalClaimed1/1000000000000000000).toFixed(0) } SHKOOBY</LightButton>
        </div>
      </div>
    </div>
  );
};

export default Overview;

const OverviewContent = ({
  title = "YOUR STAKED BALANCE",
  price = "SHKOOBY 2,42,05,434",
  price2, 
  btn = "primary",
  btnText = "Stake",
  disable = false,
  account,
  loadWeb3,
}) => (
  <div className=" text-center">
    <h6 className="font-semibold text-primary text-xl md:text-2xl">{title}</h6>
    <p className="font-semibold text-sm md:text-base my-6">{price}</p>
    <p className="font-semibold text-sm md:text-base my-6">{price2}</p>

    {btn === "primary" ? (
      <>
        {account ? (
          <a href="#stack">
            <PrimaryBtn>{btnText}</PrimaryBtn>
          </a>
        ) : (
          <button
            onClick={loadWeb3}
            className="bg-gray-600 py-2 px-6 rounded-md font-medium"
          >
            Connect Wallet
          </button>
        )}
      </>
    ) : account ? (
      <SecondaryBtn disable>{btnText}</SecondaryBtn>
    ) : (
      <button
        onClick={loadWeb3}
        className="bg-gray-600 py-2 px-6 rounded-md font-medium"
      >
        Connect Wallet
      </button>
    )}
  </div>
);
