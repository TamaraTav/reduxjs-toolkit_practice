import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomerState {
  fullName: string;
  nationalID: string;
  createdAt: string;
}

interface CreateCustomerPayload {
  fullName: string;
  nationalID: string;
  createdAt: string;
}

interface UpdateNamePayload {
  fullName: string;
}

const initialState: CustomerState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName: string, nationalID: string) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },

      reducer(state, action: PayloadAction<CreateCustomerPayload>) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action: PayloadAction<UpdateNamePayload>) {
      state.fullName = action.payload.fullName;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;

/*
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

export default function customerReducer(
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

export function createCustomer(
  fullName: string,
  nationalID: string
): CreateCustomerAction {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullName: string): UpdateNameAction {
  return { type: "customer/updateName", payload: { fullName } };
}
*/
