import React from 'react';
import { LuTrendingUpDown } from "react-icons/lu";
import CARD_2 from "../../assets/images/card2.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Left Side */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>

      {/* Right Side */}
      <div className="hidden md:flex flex-col justify-between w-[40vw] h-screen bg-violet-50 relative overflow-hidden p-8">
        {/* Colored Shapes */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 left-5 z-0" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10 z-0" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5 z-0" />

        {/* Stats Card */}
        <div className="z-10 mt-8">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="₹430,000"
            color="bg-purple-500"
          />
        </div>

        {/* Histogram Image */}
        <div className="z-10 mb-4 flex justify-end">
          <img
            src={CARD_2}
            alt="Histogram"
            className="w-[95%] h-auto max-h-[350px] object-contain rounded-xl shadow-xl shadow-blue-400/20 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">{value}</span>
      </div>
    </div>
  );
};
