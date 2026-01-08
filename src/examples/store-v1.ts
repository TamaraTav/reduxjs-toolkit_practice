import { createStore, Action, combineReducers } from "redux";

const accountInitialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const ACCOUNT_DEPOSIT = "account/deposit";

const customerInitialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

interface AccountState {
  balance: number;
  loan: number;
  loanPurpose: string;
}

interface DepositAction extends Action {
  type: typeof ACCOUNT_DEPOSIT;
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

type AccountActions =
  | DepositAction
  | WithdrawAction
  | RequestLoanAction
  | PayLoanAction;

interface CustomerState {
  fullName: string;
  nationalID: string;
  createdAt: string;
}

interface CreateCustomerAction extends Action {
  type: "customer/createCustomer";
  payload: {
    fullName: string;
    nationalID: string;
    createdAt: string;
  };
}

interface UpdateNameAction extends Action {
  type: "customer/updateName";
  payload: {
    fullName: string;
  };
}

type CustomerActions = CreateCustomerAction | UpdateNameAction;

function accountReducer(
  state: AccountState = accountInitialState,
  action: AccountActions
) {
  switch (action.type) {
    case ACCOUNT_DEPOSIT:
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case "account/withdraw":
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
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function custumerReducer(
  state: CustomerState = customerInitialState,
  action: CustomerActions
) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload.fullName,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: custumerReducer,
});

const store = createStore(rootReducer);

store.dispatch<DepositAction>(deposit(1000000));

console.log(store.getState());

store.dispatch<WithdrawAction>(withdraw(50000));

console.log(store.getState());

store.dispatch<RequestLoanAction>(requestLoan(100000, "Buy a car"));

console.log(store.getState());

store.dispatch<PayLoanAction>(payLoan());

console.log(store.getState());

function deposit(amount: number): DepositAction {
  return { type: ACCOUNT_DEPOSIT, payload: amount };
}

function withdraw(amount: number): WithdrawAction {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount: number, purpose: string): RequestLoanAction {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

function payLoan(): PayLoanAction {
  return { type: "account/payLoan" };
}

function createCustomer(
  fullName: string,
  nationalID: string
): CreateCustomerAction {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName: string): UpdateNameAction {
  return { type: "customer/updateName", payload: { fullName } };
}

store.dispatch<CreateCustomerAction>(createCustomer("John Doe", "1234567890"));

console.log(store.getState());

store.dispatch<UpdateNameAction>(updateName("Temo"));
console.log(store.getState());
