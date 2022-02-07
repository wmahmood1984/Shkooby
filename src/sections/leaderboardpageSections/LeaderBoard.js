/* eslint-disable no-unused-vars */
import { Title } from "../../components";

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

const Reward = () => {
  return (
    <div>
      <div className="bg-dark-500 py-10 px-4 md:px-0">
        <Title title="Leaderboard" />
        {/* <p className="font-normal text-base md:text-lg mt-8 text-center text-gray md:mx-20  xl:mx-72">
          The <span className="text-primary font-bold">SHKOOBY INU</span>{" "}
          Provide a Leaderboard list which one is provide to you top 200
          Addresses on the board
        </p> */}
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
    </div>
  );
};

export default Reward;
