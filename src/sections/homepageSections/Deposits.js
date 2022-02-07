import { deposisData } from "../../data";
import { Title } from "../../components";
const Deposits = () => {
  return (
    <div className="py-20">
      <Title title="Deposits" />
      <div className="overflow-x-auto">
        <div style={{ width: 1288 }}>
          <div className="grid grid-cols-2 gap-4 mt-20 mb-10">
            <div className=" flex items-center justify-between">
              <p className="text-xl font-medium">Pools</p>
              <p className="text-xl font-medium">Amount Staked</p>
            </div>
            <div className=" flex items-center justify-evenly">
              <p className="text-xl font-medium">LockDate</p>
              <p className="text-xl font-medium">Unlock Date</p>
            </div>
          </div>
          {deposisData.map((v, i) => (
            <div
              className=" bg-dark-500 rounded-md py-6 px-6 grid grid-cols-2 items-center mb-6"
              key={i}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={v.img} alt="" />
                  <p className="ml-3 font-semibold  text-xl">{v.name}</p>
                </div>
                <p className="ml-3 font-semibold  text-xl">{v.amount}</p>
              </div>
              <div className=" flex items-center justify-evenly">
                <p className="text-xl font-semibold">{v.lockDate}</p>
                <p className="text-xl font-semibold">{v.unLockDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deposits;
