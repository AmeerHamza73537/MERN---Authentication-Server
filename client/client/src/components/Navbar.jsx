import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setisLoggedIn } =
    useContext(AppContent);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/verify-email");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      if (data.success) {
        setisLoggedIn(false);
        setUserData(null);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <img
          src={assets.logo}
          alt="Logo"
          className="w-28 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Right Section */}
        {userData ? (
          <div className="relative group">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold cursor-pointer">
              {userData.name?.[0]?.toUpperCase()}
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-200 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
              <ul className="py-2 text-sm text-slate-700">
                {!userData.isAccountVerified && (
                  <li
                    onClick={sendVerificationOtp}
                    className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                  >
                    Verify Email
                  </li>
                )}

                <li
                  onClick={logout}
                  className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-rose-600"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
          >
            Login
            <img src={assets.arrow_icon} alt="Arrow" className="w-4" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
