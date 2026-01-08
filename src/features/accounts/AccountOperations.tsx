import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";

export default function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState<string | number>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string | number>("");
  const [loanAmount, setLoanAmount] = useState<string | number>("");
  const [loanPurpose, setLoanPurpose] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { isLoading, balance, loan } = useSelector(
    (store: RootState) => store.account
  );

  const dispatch = useDispatch<AppDispatch>();

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

    dispatch(payLoan());
  };

  return (
    <div>
      <h2>Your account operations</h2>

      <div>
        <div>
          <div>
            <label>Deposit</label>
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
            />
            {errors.deposit && (
              <div style={{ color: "red" }}>{errors.deposit}</div>
            )}
          </div>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          <button onClick={handleDeposit} disabled={isLoading}>
            {isLoading ? "Converting..." : "Deposit"}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
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
          />
          {errors.withdraw && (
            <div style={{ color: "red" }}>{errors.withdraw}</div>
          )}
          <button onClick={handleWithdraw}>Withdraw</button>
        </div>

        <div>
          <label>Request Loan</label>
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
          />
          {errors.loan && <div style={{ color: "red" }}>{errors.loan}</div>}
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
            placeholder="Loan purpose"
          />
          {errors.loanPurpose && (
            <div style={{ color: "red" }}>{errors.loanPurpose}</div>
          )}
          <button onClick={handleRequestLoan}>Request Loan</button>
        </div>

        <div>
          <button onClick={handlePayLoan} disabled={loan === 0}>
            Pay Loan {loan > 0 && `(${loan})`}
          </button>
          {errors.payLoan && (
            <div style={{ color: "red" }}>{errors.payLoan}</div>
          )}
        </div>
      </div>
    </div>
  );
}
