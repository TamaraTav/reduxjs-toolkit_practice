import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "./Customer.css";

export default function Customer() {
  const customer = useSelector((store: RootState) => store.customer);
  return (
    <div className="customer-header">
      <h2 className="welcome-text">Welcome back,</h2>
      <h1 className="customer-name">{customer.fullName}</h1>
    </div>
  );
}
