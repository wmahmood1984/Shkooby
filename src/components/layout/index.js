import React from "react";
import Header from "../header";
import Footer from "../footer";

const Index = ({
  children,
  showLogin,
  setShowLogin,
  account,
  showLogout,
  setShowLogout,
}) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        account={account}
        setShowLogout={setShowLogout}
        showLogout={showLogout}
      />
      <div className="flex-1 layout mt-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Index;
