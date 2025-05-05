import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
  } from "react-icons/lu";
  
  export const SIDE_MENU_DATA = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LuLayoutDashboard,
    },
    {
      label: "Income",
      path: "/income",
      icon: LuHandCoins,
    },
    {
      label: "Expense",
      path: "/expense",
      icon: LuWalletMinimal,
    },
    {
      label: "Logout",
      path: "logout",
      icon: LuLogOut,
    },
  ];
  