import { useEffect, useRef } from "react";
import "./style.css";
import { PrimaryBtn } from "../button";
const data = [
  {
    title: "Stake Pool",
    result: "Flexi Pool",
  },
  {
    title: "Lock Duration",
    result: "Flexible",
  },
  {
    title: "Rewards",
    result: "0.5% Daily",
  },
  {
    title: "Pool APR",
    result: "893.47%",
  },
];
const FexiConfirm = ({ open, setOpen }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const stakeHandler = () => {};

  return (
    <div className={`modal stack ${open ? "active" : ""}`}>
      <div className="modal-content-wrapper">
        <div className="container">
          <div className="modal-wrapper" ref={modalRef}>
            <div className="border-b border-primary pb-3 flex justify-between items-center">
              <h1 className=" text-left font-bold text-3xl mt-0">SHKOOBY</h1>
              <div className="py-3 px-5 rounded-lg font-bold bg-dark-700">
                0x44c0…820e
              </div>
            </div>
            <h2 className="font-semibold text-3xl text-primary text-left my-4">
              Details
            </h2>
            <div className="my-10">
              <ul>
                {data.map((v, i) => (
                  <li
                    className={`grid grid-cols-2 gap-2 ${
                      i % 2 === 0 ? "bg-dark-800" : "bg-dark-900"
                    }  w-full py-4 px-10`}
                    key={i}
                  >
                    <div className=" text-left">
                      <p className=" text-sm sm:text-base">{v.title}:</p>
                    </div>
                    <div className=" text-right">
                      <p className="font-medium text-sm sm:text-base">
                        {v.result}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 primary-btn">
              <PrimaryBtn onClick={() => setOpen((prev) => !prev)}>
                Stake
              </PrimaryBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FexiConfirm;
