import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20 shadow-sm">
      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
      {user?.profileImageUrl ? (
  <img
    src={user.profileImageUrl}
    alt="Profile"
    className="w-20 h-20 rounded-full object-cover ring-2 ring-primary"
  />
) : (
  <CharAvatar
    fullName={user?.fullName}
    width="w-20"
    height="h-20"
    style="text-xl"
  />
)}

        <h5 className="text-gray-900 font-semibold text-lg">
          {user?.fullName || "Guest User"}
        </h5>
      </div>

      {/* Menu Items */}
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-sm font-medium transition-all duration-200 py-3 px-5 rounded-lg mb-2 ${
            activeMenu === item.label
               ? "text-white bg-violet-500"
              : "text-gray-700 hover:bg-gray-100 hover:text-primary"
          }`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
