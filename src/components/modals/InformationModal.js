// import { useEffect, useRef } from "react";
import "./style.css";

const Index = ({
  open,
  setOpen,
  title = "OOPS",
  desc = "Request Access Denied",
}) => {
  return (
    <div className={`modal logout information ${open ? "active" : ""}`}>
      <div className="modal-content-wrapper">
        <div className="container">
          <div
            className="modal-wrapper flex flex-col items-center justify-between"
            // ref={modalRef}
          >
            <h1 className="text-white font-semibold text-3xl ">{title}</h1>
            <p>{desc}</p>
            <div className="inform-btn">
              <button
                className="py-2 px-8 bg-dark-700 rounded-xl"
                onClick={() => {
                  setOpen(false);
                  if (title === "Success") {
                    window.location.reload();
                  }
                }}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
