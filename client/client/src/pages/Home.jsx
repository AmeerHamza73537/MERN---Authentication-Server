import React from "react";
import Navbar from "../components/nAVBAR.JSX";
import Header from "../components/Header.jsx";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100">
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;
