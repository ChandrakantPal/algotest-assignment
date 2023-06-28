import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-screen px-4 pb-4 md:px-10 md:pb-10 mt-[72px] md:mt-28">
        {children}
      </main>
    </>
  );
};

export default Layout;
