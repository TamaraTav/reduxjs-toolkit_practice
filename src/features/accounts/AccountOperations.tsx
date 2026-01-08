import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";
import "./AccountOperations.css";

export default function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState<string | number>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string | number>("");
  const [loanAmount, setLoanAmount] = useState<string | number>("");
  const [loanPurpose, setLoanPurpose] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessages, setSuccessMessages] = useState<
    Record<string, string>
  >({});

  const { isLoading, balance, loan } = useSelector(
    (store: RootState) => store.account
  );

  const dispatch = useDispatch<AppDispatch>();

  // Clear payLoan error when loan or balance changes
  useEffect(() => {
    if (errors.payLoan) {
      // Clear error if loan is paid off or balance becomes sufficient
      if (loan === 0 || balance >= loan) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.payLoan;
          return newErrors;
        });
      }
    }
  }, [loan, balance, errors.payLoan]);

  const showSuccess = (fieldName: string, message: string) => {
    setSuccessMessages((prev) => ({ ...prev, [fieldName]: message }));
    setTimeout(() => {
      setSuccessMessages((prev) => {
        const newMessages = { ...prev };
        delete newMessages[fieldName];
        return newMessages;
      });
    }, 3000);
  };

  const validateAmount = (amount: number, fieldName: string): boolean => {
    if (isNaN(amount) || amount <= 0) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "Amount must be a positive number",
      }));
      return false;
    }
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
    return true;
  };

  const handleDeposit = () => {
    const amount = +depositAmount;
    if (!depositAmount) {
      setErrors((prev) => ({ ...prev, deposit: "Please enter an amount" }));
      return;
    }

    if (!validateAmount(amount, "deposit")) return;

    dispatch(deposit(amount, currency));
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
    showSuccess(
      "deposit",
      `Deposit successful! ${formattedAmount} added to your account`
    );
    setDepositAmount("");
  };

  const handleWithdraw = () => {
    const amount = +withdrawAmount;
    if (!withdrawAmount) {
      setErrors((prev) => ({ ...prev, withdraw: "Please enter an amount" }));
      return;
    }

    if (!validateAmount(amount, "withdraw")) return;

    if (amount > balance) {
      setErrors((prev) => ({
        ...prev,
        withdraw: "Insufficient balance",
      }));
      return;
    }

    dispatch(withdraw(amount));
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
    showSuccess(
      "withdraw",
      `Withdrawal successful! ${formattedAmount} withdrawn`
    );
    setWithdrawAmount("");
  };

  const handleRequestLoan = () => {
    const amount = +loanAmount;
    if (!loanAmount) {
      setErrors((prev) => ({ ...prev, loan: "Please enter loan amount" }));
      return;
    }

    if (!loanPurpose.trim()) {
      setErrors((prev) => ({
        ...prev,
        loanPurpose: "Please enter loan purpose",
      }));
      return;
    }

    if (!validateAmount(amount, "loan")) return;

    if (loan > 0) {
      setErrors((prev) => ({
        ...prev,
        loan: "You already have an active loan",
      }));
      return;
    }

    dispatch(requestLoan(amount, loanPurpose));
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
    showSuccess(
      "loan",
      `Loan requested successfully! ${formattedAmount} loan approved`
    );
    setLoanAmount("");
    setLoanPurpose("");
  };

  const handlePayLoan = () => {
    if (loan === 0) {
      setErrors((prev) => ({
        ...prev,
        payLoan: "You don't have an active loan",
      }));
      return;
    }

    if (balance < loan) {
      setErrors((prev) => ({
        ...prev,
        payLoan: "Insufficient balance to pay loan",
      }));
      return;
    }

    const loanAmountToPay = loan;
    // Clear any existing errors before success
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.payLoan;
      return newErrors;
    });
    dispatch(payLoan());
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(loanAmountToPay);
    showSuccess(
      "payLoan",
      `Loan paid successfully! ${formattedAmount} loan cleared`
    );
  };

  return (
    <div className="operations-container">
      <h2 className="operations-title">Account Operations</h2>

      <div className="operations-grid">
        <div className="operation-card">
          <div className="operation-header">
            <h3>Deposit</h3>
            <span className="operation-icon">💰</span>
          </div>
          <div className="operation-content">
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => {
                  setDepositAmount(e.target.value);
                  if (errors.deposit) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.deposit;
                      return newErrors;
                    });
                  }
                }}
                placeholder="0.00"
              />
              {errors.deposit && (
                <div className="error-message">{errors.deposit}</div>
              )}
              {successMessages.deposit && (
                <div className="success-message">{successMessages.deposit}</div>
              )}
            </div>

            <div className="form-group">
              <label>Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="currency-select"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <button
              onClick={handleDeposit}
              disabled={isLoading}
              className="operation-button deposit-button"
            >
              {isLoading ? "Converting..." : "Deposit"}
            </button>
          </div>
        </div>

        <div className="operation-card">
          <div className="operation-header">
            <h3>Withdraw</h3>
            <span className="operation-icon">💸</span>
          </div>
          <div className="operation-content">
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => {
                  setWithdrawAmount(e.target.value);
                  if (errors.withdraw) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.withdraw;
                      return newErrors;
                    });
                  }
                }}
                placeholder="0.00"
              />
              {errors.withdraw && (
                <div className="error-message">{errors.withdraw}</div>
              )}
              {successMessages.withdraw && (
                <div className="success-message">
                  {successMessages.withdraw}
                </div>
              )}
            </div>
            <div className="form-group-spacer"></div>
            <button
              onClick={handleWithdraw}
              className="operation-button withdraw-button"
            >
              Withdraw
            </button>
          </div>
        </div>

        <div className="operation-card">
          <div className="operation-header">
            <h3>Request Loan</h3>
            <span className="operation-icon">🏦</span>
          </div>
          <div className="operation-content">
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => {
                  setLoanAmount(e.target.value);
                  if (errors.loan) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.loan;
                      return newErrors;
                    });
                  }
                }}
                placeholder="0.00"
              />
              {errors.loan && (
                <div className="error-message">{errors.loan}</div>
              )}
              {successMessages.loan && (
                <div className="success-message">{successMessages.loan}</div>
              )}
            </div>
            <div className="form-group">
              <label>Purpose</label>
              <input
                type="text"
                value={loanPurpose}
                onChange={(e) => {
                  setLoanPurpose(e.target.value);
                  if (errors.loanPurpose) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.loanPurpose;
                      return newErrors;
                    });
                  }
                }}
                placeholder="e.g., Buy a car"
              />
              {errors.loanPurpose && (
                <div className="error-message">{errors.loanPurpose}</div>
              )}
            </div>
            <button
              onClick={handleRequestLoan}
              className="operation-button loan-button"
            >
              Request Loan
            </button>
          </div>
        </div>

        <div className="operation-card">
          <div className="operation-header">
            <h3>Pay Loan</h3>
            <span className="operation-icon">✅</span>
          </div>
          <div className="operation-content">
            {loan > 0 && (
              <div className="loan-summary">
                <p className="loan-amount-display">
                  Outstanding:{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(loan)}
                </p>
              </div>
            )}
            {errors.payLoan && (
              <div className="error-message">{errors.payLoan}</div>
            )}
            {successMessages.payLoan && (
              <div className="success-message">{successMessages.payLoan}</div>
            )}
            <button
              onClick={handlePayLoan}
              disabled={loan === 0}
              className="operation-button pay-loan-button"
            >
              Pay Loan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
