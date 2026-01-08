import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";

interface AccountState {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
}

interface RequestLoanPayload {
  amount: number;
  purpose: string;
}

const initialState: AccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action: PayloadAction<number>) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action: PayloadAction<number>) {
      if (state.balance < action.payload) return;
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action: PayloadAction<RequestLoanPayload>) {
        if (state.loan > 0) return;
        state.balance += action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state) {
      if (state.balance < state.loan) return;
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const {
  deposit: depositAction,
  withdraw,
  requestLoan,
  payLoan,
  convertingCurrency,
} = accountSlice.actions;
export default accountSlice.reducer;

export function deposit(amount: number, currency: string) {
  if (currency === "USD") {
    return depositAction(amount);
  }

  return async function (dispatch: AppDispatch) {
    try {
      dispatch(convertingCurrency());
      const host = "api.frankfurter.app";
      const response = await fetch(
        `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.rates || !data.rates.USD) {
        throw new Error("Invalid response from currency API");
      }

      const convertedAmount = data.rates.USD;
      dispatch(depositAction(convertedAmount));
    } catch (error) {
      console.error("Currency conversion error:", error);
      dispatch(depositAction(0));
    }
  };
}
