import "./App.css";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function App() {
  const customer = useSelector((state: RootState) => state.customer);
  return (
    <>
      {!customer.fullName ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <BalanceDisplay />
          <AccountOperations />
        </>
      )}
    </>
  );
}

export default App;
