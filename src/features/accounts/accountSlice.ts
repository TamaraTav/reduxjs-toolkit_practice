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

export const { withdraw, requestLoan, payLoan, convertingCurrency } =
  accountSlice.actions;
export default accountSlice.reducer;

export function deposit(amount: number, currency: string) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch: AppDispatch) {
    dispatch({ type: "account/convertingCurrency" });
    const host = "api.frankfurter.app";
    const response = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await response.json();
    const convertedAmount = data.rates.USD;

    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

/*
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AccountState,
  unknown,
  Action<string>
>;



interface DepositAction extends Action {
  type: "account/deposit";
  payload: number;
}

interface WithdrawAction extends Action {
  type: "account/withdraw";
  payload: number;
}

interface RequestLoanAction extends Action {
  type: "account/requestLoan";
  payload: {
    amount: number;
    purpose: string;
  };
}

interface PayLoanAction extends Action {
  type: "account/payLoan";
}

interface ConvertingCurrencyAction extends Action {
  type: "account/convertingCurrency";
}

type AccountActions =
  | DepositAction
  | WithdrawAction
  | RequestLoanAction
  | PayLoanAction
  | ConvertingCurrencyAction;

export default function accountReducer(
  state: AccountState = accountInitialState,
  action: AccountActions
) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case "account/withdraw":
      if (state.balance < action.payload) return state;
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case "account/payLoan":
      if (state.balance < state.loan) return state;
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

export function deposit(
  amount: number,
  currency: string
): DepositAction | AppThunk {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch) {
    dispatch({ type: "account/convertingCurrency" });
    const host = "api.frankfurter.app";
    const response = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await response.json();
    const convertedAmount = data.rates.USD;

    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

export function withdraw(amount: number): WithdrawAction {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(
  amount: number,
  purpose: string
): RequestLoanAction {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

export function payLoan(): PayLoanAction {
  return { type: "account/payLoan" };
}
*/
