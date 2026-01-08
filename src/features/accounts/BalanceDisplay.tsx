import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "./BalanceDisplay.css";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function BalanceDisplay() {
  const { balance, loan, loanPurpose } = useSelector(
    (store: RootState) => store.account
  );
  return (
    <div className="balance-card">
      <div className="balance-header">
        <h2 className="balance-label">Account Balance</h2>
        <h1 className="balance-amount">{formatCurrency(balance)}</h1>
      </div>
      {loan > 0 && (
        <div className="loan-info">
          <div className="loan-header">
            <h3>Active Loan</h3>
            <span className="loan-badge">Active</span>
          </div>
          <div className="loan-details">
            <div className="loan-item">
              <span className="loan-label">Amount:</span>
              <span className="loan-value">{formatCurrency(loan)}</span>
            </div>
            <div className="loan-item">
              <span className="loan-label">Purpose:</span>
              <span className="loan-value">{loanPurpose}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
