import { useEffect, useRef } from "react";
import "./style.css";
import Logo from "../../assets/images/metaLogo.png";

const Index = ({ showLogin, setShowLogin, loadWeb3 }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!modalRef.current.contains(e.target)) {
        setShowLogin(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`modal ${showLogin ? "active" : ""}`}>
      <div className="modal-content-wrapper">
        <div className="container">
          <div className="modal-wrapper" ref={modalRef}>
            <h1 className="text-primary font-semibold text-3xl mt-6">
              Connect Wallet
            </h1>
            <p className=" max-w-xs  mx-auto mt-4 mb-4">
              Click Below for Connect to the site with your Metamask Wallet
            </p>
            <div className="connect cursor-pointer" onClick={() => loadWeb3()}>
              <div>
                <img src={Logo} alt="" className="mx-auto " />
              </div>
              <button className="font-bold text-3xl mt-8">Metamask</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
