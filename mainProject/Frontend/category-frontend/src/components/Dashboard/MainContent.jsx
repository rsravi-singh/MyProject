import DashboardHome from "./DashboardHome";
import Statements from "./Statements";
import MoneyTransfer from "../SendMoney/MoneyTransfer";
import CardComponent from "../Cardcomponant/carddetails.jsx";

const MainContent = ({ selected }) => {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      {selected === "Dashboard" && <DashboardHome />}

      {/* Add: `else if` for other options like Loan, Statements etc later */}
      {selected === "Statements" && <Statements />}
      {selected === "Send Money" && <MoneyTransfer />}
      {selected === "Manage Cards" && <CardComponent />}
    </div>
  );
};

export default MainContent;
