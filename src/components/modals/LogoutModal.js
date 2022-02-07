import { useEffect, useRef } from "react";
import "./style.css";
import { PrimaryBtn } from "../button";
const Index = ({ open, setOpen }) => {
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
  const logoutHandler = () => {
    window.localStorage.removeItem("account");
    window.location.reload();
  };
  return (
    <div className={`modal logout ${open ? "active" : ""}`}>
      <div className="modal-content-wrapper">
        <div className="container">
          <div className="modal-wrapper" ref={modalRef}>
            <h1 className="text-primary font-semibold text-3xl mt-14">
              Wallet is Connected
            </h1>
            <div className="mt-10">
              <PrimaryBtn roundedfull={true} onClick={logoutHandler}>
                Disconnect
              </PrimaryBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
