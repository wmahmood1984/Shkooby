/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./style.css";
import { FiSearch, FiCopy } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Data from "../../MOCK_DATA.json";
import { Title } from "../../components";
const topListHead = ["Top 10", "Top 50", "Top 100"];

const data = [
  {
    title: "Rank",
    result: "Not ranked",
  },
  {
    title: "Next milestone",
    result: "Top 200",
  },
  {
    title: "Next milestone reward",
    result: "Free NFT",
  },
  {
    title: "Amount needed",
    result: "Not ranked",
  },
  {
    title: "Time remaining",
    result: "Ranking complete. Final snapshot displayed below.",
  },
];
const SearchList = () => {
  const [currentActive, setCurrentActive] = useState(0);
  // const [currentClip, setCurrentClip] = useState(0);
  const [showList, setShowList] = useState(10);

  const changeActive = (i) => {
    setCurrentActive(i);
    setShowList(i === 0 ? 10 : i === 1 ? 50 : 100);
  };
  // const changeClip = (i) => {
  //   setCurrentClip(i);
  // };

  return (
    <>
      <div className="bg-dark-500 py-10 px-4 md:px-0">
        <Title title="Leaderboard" />
        {/* <p className="font-normal text-base md:text-lg mt-8 text-center text-gray md:mx-20  xl:mx-72">
          The <span className="text-primary font-bold">SHKOOBY INU</span>{" "}
          Provide a Leaderboard list which one is provide to you top 200
          Addresses on the board
        </p> */}
        <div className="bg-dark-700 grid grid-cols-3 py-3 md:py-4 px-6 md:px-10 max-w-2xl w-full mx-auto rounded-lg mt-10">
          {topListHead.map((v, i) => (
            <button
              key={i}
              onClick={() => changeActive(i)}
              className={`${
                currentActive === i ? "bg-dark-900" : ""
              }  font-semibold text-lg md:text-2xl py-3 rounded-lg`}
            >
              {v}
            </button>
          ))}
        </div>
        <div className="w-11/12 mx-auto">
          <div className="border-b border-primary border-opacity-50 pt-10 pb-4 flex justify-center items-baseline">
            <h1 className="text-center font-semibold text-lg sm:text-3xl mr-5 sm:mr-10">
              <span className="text-primary"> You: </span>
              <span>0x4125…FD7B</span>
            </h1>
            <p className="font-medium text-base sm:text-lg">
              Rank: <span className="font-normal text-base">No Rank</span>
            </p>
          </div>
          {/* <div className="my-10">
            <ul>
              {data.map((v, i) => (
                <li
                  className={`grid grid-cols-2 sm:grid-cols-4 gap-8 ${
                    i % 2 === 0 ? "bg-dark-800" : "bg-dark-900"
                  }  w-full py-4 px-10`}
                  key={i}
                >
                  <div className="sm:col-span-1">
                    <p className="font-medium text-base sm:text-lg">
                      {v.title}:
                    </p>
                  </div>
                  <div className="sm:col-span-3">
                    <p className="font-normal text-sm sm:text-base">
                      {v.result}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
      <section className="py-20">
        <div className="max-w-5xl w-full mx-auto">
          <SearchBar />
          <div className="my-10">
            {Data.slice(0, showList).map((item, i) => (
              <ListCard
                rank={`#${item.rank}`}
                usd_value={`$${item.usd_value}`}
                contribute={`SHKOOBY ${item.contributed}`}
                key={i}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchList;

const SearchBar = () => (
  <form action="">
    <div className="mt-10 mb-8 rounded-lg search-bar">
      <span>
        <FiSearch />
      </span>
      <input
        type="text"
        name=""
        id=""
        className="w-full h-full"
        placeholder="Search for an address"
      />
    </div>
  </form>
);

const ListCard = ({
  rank = "#1",
  address = "0x1031b8cf...9ee",
  contribute = "SHKOOBY 498,158.455",
  usd_value = "$4,109,807.26",
  ...props
}) => (
  <div
    className={`${
      rank === "#1"
        ? "rank-1"
        : rank === "#2"
        ? "rank-2"
        : rank === "#3"
        ? "rank-2"
        : rank === "#4"
        ? "rank-2"
        : rank === "#5"
        ? "rank-2"
        : "bg-dark-300"
    } rounded-lg  px-4 sm:px-10 py-6 grid grid-cols-1  md:grid-cols-2 gap-20 mb-8`}
    {...props}
  >
    <div className=" flex justify-between items-center sm:grid sm:grid-cols-2">
      <ListContentBox desc={rank} />
      <ListContentBox title="Address" desc={address} clip />
    </div>
    <div className="md:flex justify-between hidden ">
      <ListContentBox title="Contributed" desc={contribute} />
      <ListContentBox title="USD Value" desc={usd_value} />
    </div>
  </div>
);

const ListContentBox = ({ title = "Rank", desc = "#1", clip = false }) => (
  <div>
    <span className="font-medium text-sm">{title}</span>
    <p className="font-bold  text-lg mt-1 flex items-center">
      <span> {desc}</span>
      {clip && (
        <span className="ml-1">
          <CopyToClipboard text={desc} onCopy={() => alert(desc)}>
            <button>
              <FiCopy />
            </button>
          </CopyToClipboard>
        </span>
      )}
    </p>
  </div>
);
