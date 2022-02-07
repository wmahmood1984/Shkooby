// import { useEffect, useRef } from "react";
import "./style.css";
import Spinner from "react-svg-spinner";
const Index = ({
  open,
  setOpen,
  title = "Confirm",
  desc = "Please Confirm Transaction!",
}) => {
  //   const modalRef = useRef();

  //   useEffect(() => {
  //     const handler = (e) => {
  //       if (!modalRef.current.contains(e.target)) {
  //         setOpen(false);
  //       }
  //     };

  //     document.addEventListener("mousedown", handler);
  //     return () => {
  //       document.removeEventListener("mousedown", handler);
  //     };
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  return (
    <div className={`modal logout information ${open ? "active" : ""}`}>
      <div className="modal-content-wrapper">
        <div className="container">
          <div
            className="modal-wrapper flex flex-col items-center justify-between"
            // ref={modalRef}
          >
            <h1 className="text-white font-semibold text-3xl ">{title}</h1>
            <div className="my-4">
              <Spinner size="40px" color="fuchsia" />
            </div>

            <p className=" max-w-sm mx-auto w-full">{desc}</p>
            {/* <div className="inform-btn">
              <button
                className="py-2 px-8 bg-dark-700 rounded-xl"
                onClick={() => setOpen(false)}
              >
                Ok
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
