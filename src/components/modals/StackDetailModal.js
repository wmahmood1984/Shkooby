import { useEffect, useRef } from "react";
import "./style.css";
import { PrimaryBtn } from "../button";

const StackModal = ({ open, setOpen, flexi, detailsData }) => {
  const modalRef = useRef();
  const data = [
    {
      title: "Stake Pool",
      result: "Locked Pool",
    },
    {
      title: "Lock Duration",
      result: ` ${
        detailsData ? (detailsData[2] ? detailsData[2][1] : 0) : 0
      }  Days`,
    },
    {
      title: "Rewards",
      result: ` ${
        detailsData ? (detailsData[2] ? Number(detailsData[2][3]) / 100 : 0) : 0
      }% Daily`,
    },
    {
      title: "Pool APR",
      result: ` ${
        detailsData ? (detailsData[2] ? Number(detailsData[2][3]) / 100 : 0) : 0
      }  %`,
    },
  ];
  const data2 = [
    {
      title: "Stake Pool",
      result: "Felxi Pool",
    },

    {
      title: "Rewards",
      result: ` ${
        detailsData ? (detailsData[2] ? Number(detailsData[2][3]) / 100 : 0) : 0
      }% Daily`,
    },
    {
      title: "Pool APR",
      result:
        "Note: Our Flexi Pool allows you to redeem your staked assets at any time.",
    },
  ];
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

  return (
    <div className={`modal stack ${open ? "active" : ""}`}>
      <div className="modal-content-wrapper">
        <div className="container">
          <div className="modal-wrapper" ref={modalRef}>
            <div className="border-b border-primary pb-3 flex justify-between items-center">
              <h1 className=" text-left font-bold text-3xl mt-0">SHKOOBY</h1>
            </div>
            <h2 className="font-semibold text-3xl text-primary text-left my-4">
              Details
            </h2>
            <div className="my-10">
              <ul>
                {flexi
                  ? data2.map((v, i) => (
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
                    ))
                  : data.map((v, i) => (
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
                Close
              </PrimaryBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackModal;
