import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { menuList } from "../../data";
import { PrimaryRounded } from "../button";
import CustomLink from "./CustomLink";
import "./style.css";

const Index = ({
  showLogin,
  setShowLogin,
  account,
  showLogout,
  setShowLogout,
}) => {
  const [show, setShow] = useState(false);

  const menuHandler = () => {
    setShow((prev) => !prev);
  };
  const loginHandler = () => {
    if (!account) {
      setShowLogin((prev) => !prev);
    }
    if (account) {
      setShowLogout((prev) => !prev);
    }
  };

  const menuRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <header className="bg-dark-400 shadow-lg">
      <div className="container p-4 flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="" className="w-40 md:w-64" />
        </Link>
        <ul className="  items-center hidden lg:flex">
          {menuList.map((v, i) => (
            <li key={i}>
              <CustomLink to={v.to} isDisable={v.isDisable}>
                {v.name}
              </CustomLink>
            </li>
          ))}
          <li>
            <PrimaryRounded onClick={loginHandler}>
              {account
                ? account.slice(0, 8) +
                  "..." +
                  account.slice(account.length - 5)
                : "Connect Wallet"}
            </PrimaryRounded>
          </li>
        </ul>
        <button className="lg:hidden text-2xl" onClick={menuHandler}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <div className={`mobile-menu ${show ? "active" : ""}`} ref={menuRef}>
        <div className=" text-right  px-4 py-4 text-2xl">
          <i className="fas fa-times" onClick={menuHandler}></i>
        </div>
        <ul className=" lg:hidden">
          {menuList.map((v, i) => (
            <li key={i}>
              <CustomLink
                to={v.to}
                isDisable={v.isDisable}
                onClick={menuHandler}
              >
                {v.name}
              </CustomLink>
            </li>
          ))}
          <li className="ml-4">
            <PrimaryRounded>
              {" "}
              {account
                ? account.slice(0, 8) +
                  "..." +
                  account.slice(account.length - 5)
                : "Connect Wallet"}
            </PrimaryRounded>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Index;
