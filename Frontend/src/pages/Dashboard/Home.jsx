import React, { useEffect, useState } from "react";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/Cards/InfoCard";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncome from "../../components/dashboard/RecentIncome";
import RecentIncomeWithChart from "../../components/dashboard/RecentIncomeWithChart";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import { addThousandsSeparator } from "../../utils/helper";




const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);


return (
  <DashboardLayout activeMenu="Dashboard">
    <div className="my-5 mx-auto">
      { <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <InfoCard
  icon={<IoMdCard />}
  label="Total Balance"
  value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
  color="bg-blue-600" // Calm and stable for total balance
/>

<InfoCard
  icon={<LuWalletMinimal />}
  label="Total Income"
  value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
  color="bg-green-500" // Positive and growth for income
/>

<InfoCard
  icon={<LuHandCoins />}
  label="Total Expense"
  value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
  color="bg-rose-500" // Attention/danger for expenses
/>

      </div> }


  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions || []} // ✅ Correct key (case-sensitive)
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
             totalBalance={dashboardData?. totalBalance || 0}
             totalIncome={dashboardData?. totalIncome || 0}
             totalExpense={dashboardData?. totalExpenses || 0}
           />

            <ExpenseTransactions
               transactions={dashboardData?.last30DaysExpenses?.transactions || [] }
               onSeeMore={ () => navigate("/expense")}
             />

             <Last30DaysExpenses
                data={dashboardData?.last30DaysExpenses?.transactions || []}
             />

{dashboardData && dashboardData.last60DaysIncome ? (
  <>
    <RecentIncomeWithChart
      data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
      totalIncome={dashboardData?.totalIncome || 0}
    />
    <RecentIncome
      transactions={dashboardData?.last60DaysIncome?.transactions || []}
      onSeeMore={() => navigate("/income")}
    />
  </>
) : (
  <div>Loading...</div> // Display loading or placeholder while waiting for data
)}



        </div>
      </div>
    </DashboardLayout>
  );
};


export default Home;
