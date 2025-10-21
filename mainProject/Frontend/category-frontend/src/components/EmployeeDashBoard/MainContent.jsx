import CustomersManagement from './SearchFilterCustomers.jsx';
import SearchFilterRequests from './SearchFilterRequest.jsx';
import SearchFilterTransactions from './SearchFilterTransactions.jsx';

const MainContent = ({ selected }) => {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      {selected === 'Customer Management' && <CustomersManagement />}
      {/* Add: `else if` for other options like Loan, Statements etc later */}
      {selected === 'Approval of Customer' && <SearchFilterRequests />}
      {selected === 'Transaction Management' && <SearchFilterTransactions />}
    </div>
  );
};

export default MainContent;
