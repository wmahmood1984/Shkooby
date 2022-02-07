/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import Home from "./pages/Home";
import Reward from "./pages/Rewards";
import LeaderBoard from "./pages/LeaderBoard";
import Swap from "./pages/Swap";
import Modal from "./components/modals";
import {
  LogoutModal,
  StackModal,
  StackDetailModal,
  InformationModal,
} from "./components";
import Web3 from "web3";
import { contractAbi, contractAddress } from "./config";
import { contractAbi2, contractAddress2 } from "./config2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Details from "./pages/Details";
import Stake from "./pages/Stake";
import { useDispatch, useSelector } from 'react-redux';
import { initWeb3 } from "./state/ui";
toast.configure();
function App() {
  const [chainId, setChainId] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [contract2, setContract2] = useState(null);

  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [price, setPrice] = useState(0);
  const [displayPrice, setDisplayPrice] = useState(0);
  const [accessAccountDenied, setAccessAccountDenied] = useState(false);
  const [installEthereum, setInstallEthereum] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [stackOpen, setStackOpen] = useState(false);
  const [stackDetailOpen, setStackDetailOpen] = useState(false);
  const [poolIds, setPoolIds] = useState([]);
  const dispatch = useDispatch()
  
  const approved = useSelector((state)=>{
    return state.adoptReducer.approved;
  });

  useEffect(() => {
    const account = window.localStorage.getItem("account");
    if (account === "metamask") {
      //loadWeb3();
      dispatch(initWeb3())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approved]);

  async function loadWeb3() {
    if (window.ethereum) {
      window.localStorage.setItem("account", "metamask");
      window.web3 = new Web3(window.ethereum);
      try {
        loadBlockchainData();
        getCurrentAddressConnected();
        addAccountsAndChainListener();
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setShowLogin(false);
      } catch (error) {
        if (error.code === 4001) {
          setAccessAccountDenied(true);
        } else console.error(error);
      }
    } else {
      setShowLogin(false);
      setInstallEthereum(true);
    }
  }

  const loadBlockchainData = async () => {
    const contract = new window.web3.eth.Contract(contractAbi, contractAddress);
    setContract(contract);
    const contract2 = new window.web3.eth.Contract(
      contractAbi2,
      contractAddress2
    );
    setContract2(contract2);
    const chainId = await window.web3.eth.getChainId();
    setChainId(chainId);
    //success when chainId = 4 else failure
    // you are connected to main net
    // Please connect to main net

    if (chainId === 4) {
      toast(`You are connected to main net`, {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
      });
      // const totalSupply = await contract.methods.totalSupply().call();
      // setTotalSupply(totalSupply);

      // const price = await contract.methods.getPrice().call();
      // setPrice(price);
      // const displayPrice = window.web3.utils.fromWei(price, "ether");
      // setDisplayPrice(displayPrice);
      // const MAX_SUPPlY = await contract.methods.MAX_SUPPLY().call();
      // setMaxSupply(MAX_SUPPlY);
      const poolIds = 15000
      // console.log("pools", poolIds);
      setPoolIds(poolIds);
      // poolIds.forEach(async (element) => {
      //   const data = await contract.methods.getStakePoolDetails(element).call();
      //   // console.log(data);
      // });
    } else {
      toast("Please connect to main net", {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const getCurrentAddressConnected = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addAccountsAndChainListener = async () => {
    //this event will be emitted when the currently connected chain changes.
    window.ethereum.on("chainChanged", (_chainId) => {
      window.location.reload();
    });

    // this event will be emitted whenever the user's exposed account address changes.
    window.ethereum.on("accountsChanged", (accounts) => {
      window.location.reload();
    });
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Layout
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          account={account}
          totalSupply={totalSupply}
          displayPrice={displayPrice}
          loadWeb3={loadWeb3}
          maxSupply={maxSupply}
          showLogout={showLogout}
          setShowLogout={setShowLogout}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  contract={contract}
                  contract2={contract2}
                  contractAddress={contractAddress}
                  contractAddress2={contractAddress2}
                  poolIds={poolIds}
                  account={account}
                  stackOpen={stackOpen}
                  setStackOpen={setStackOpen}
                  stackDetailOpen={stackDetailOpen}
                  setStackDetailOpen={setStackDetailOpen}
                  loadWeb3={loadWeb3}
                />
              }
            />
            <Route
              path="rewards"
              element={
                <Reward
                  contract={contract}
                  contract2={contract2}
                  contractAddress={contractAddress}
                  contractAddress2={contractAddress2}
                  poolIds={poolIds}
                  account={account}
                  stackOpen={stackOpen}
                  setStackOpen={setStackOpen}
                  stackDetailOpen={stackDetailOpen}
                  setStackDetailOpen={setStackDetailOpen}
                />
              }
            />
            <Route path="leaderboard" element={<LeaderBoard />} />
            <Route path="swap" element={<Swap />} />
            <Route
              path="details/:id/:type"
              element={
                <Details
                  contract={contract}
                  contract2={contract2}
                  contractAddress={contractAddress}
                  contractAddress2={contractAddress2}
                  poolIds={poolIds}
                  account={account}
                />
              }
            />
            <Route
              path="stake/:id"
              element={
                <Stake
                  contract={contract}
                  contract2={contract2}
                  contractAddress={contractAddress}
                  contractAddress2={contractAddress2}
                  poolIds={poolIds}
                  account={account}
                />
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Modal
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        loadWeb3={loadWeb3}
      />
      <LogoutModal open={showLogout} setOpen={setShowLogout} />
      <StackModal
        open={stackOpen}
        setOpen={setStackOpen}
        stackDetailOpen={stackDetailOpen}
        setStackDetailOpen={setStackDetailOpen}
      />
      <StackDetailModal open={stackDetailOpen} setOpen={setStackDetailOpen} />
      <InformationModal
        open={accessAccountDenied}
        setOpen={setAccessAccountDenied}
      />
      <InformationModal
        open={installEthereum}
        setOpen={setInstallEthereum}
        title="Oops"
        desc="Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"
      />
    </div>
  );
}

export default App;
