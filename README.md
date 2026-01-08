# Redux Toolkit Practice - Banking Application

A modern, responsive banking application built with React, TypeScript, and Redux Toolkit. This project demonstrates state management using Redux Toolkit with features like customer management, account operations, and loan handling.

## Features

- **Customer Management**: Create and manage customer accounts
- **Account Operations**:
  - Deposit funds (with multi-currency support)
  - Withdraw funds
  - Request loans
  - Pay off loans
- **Real-time Balance Display**: View account balance and active loan information
- **Currency Conversion**: Automatic conversion for deposits in EUR and GBP to USD
- **Form Validation**: Comprehensive input validation with error messages
- **Success Notifications**: User-friendly success messages for all operations
- **Modern Dark Theme UI**: Beautiful, responsive design optimized for all devices

## Tech Stack

- **React 18.3.1** - UI library
- **TypeScript 5.5.3** - Type safety
- **Redux Toolkit 2.2.7** - State management
- **React Redux 9.1.2** - React bindings for Redux
- **Redux Thunk 3.1.0** - Async action handling
- **Vite 5.4.1** - Build tool and dev server
- **ESLint** - Code linting

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd reduxjs-toolkit_practice
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── features/
│   ├── accounts/
│   │   ├── AccountOperations.tsx    # Account operations UI
│   │   ├── AccountOperations.css    # Operations styling
│   │   ├── BalanceDisplay.tsx       # Balance display component
│   │   ├── BalanceDisplay.css       # Balance styling
│   │   └── accountSlice.ts          # Account Redux slice
│   └── customers/
│       ├── CreateCustomer.tsx       # Customer creation form
│       ├── CreateCustomer.css       # Form styling
│       ├── Customer.tsx             # Customer display
│       ├── Customer.css             # Customer styling
│       └── customerSlice.ts         # Customer Redux slice
├── examples/
│   ├── store-v1.ts                 # Classic Redux example
│   └── store-v2.ts                 # Redux with Thunk example
├── App.tsx                         # Main app component
├── App.css                         # App styling
├── main.tsx                        # Entry point
├── store.ts                        # Redux store configuration
└── index.css                       # Global styles
```

## Usage

1. **Create a Customer**: Enter your full name and national ID to create an account
2. **View Balance**: Your account balance is displayed prominently at the top
3. **Deposit Funds**:
   - Enter the amount
   - Select currency (USD, EUR, or GBP)
   - Click "Deposit"
4. **Withdraw Funds**: Enter the amount and click "Withdraw"
5. **Request a Loan**:
   - Enter loan amount
   - Specify the purpose
   - Click "Request Loan"
6. **Pay Loan**: Click "Pay Loan" to pay off your active loan

## Key Redux Concepts Demonstrated

- **Redux Toolkit Slices**: Using `createSlice` for reducers and actions
- **Async Thunks**: Handling async operations (currency conversion)
- **TypeScript Integration**: Fully typed Redux store and actions
- **Selector Hooks**: Using `useSelector` for accessing state
- **Dispatch Hooks**: Using `useDispatch` for dispatching actions

## Features in Detail

### Currency Conversion

When depositing in EUR or GBP, the application automatically converts the amount to USD using the [Frankfurter API](https://www.frankfurter.app/).

### Form Validation

- Full name must be at least 3 characters
- National ID must contain only numbers and be at least 5 digits
- Amounts must be positive numbers
- Balance checks for withdrawals and loan payments

### Error Handling

- Comprehensive error messages for all operations
- Automatic error clearing when conditions change
- User-friendly error display

## Browser Support

Modern browsers that support ES6+ features.

## License

This project is for educational purposes.

## Author

**Tamara Tava**

- LinkedIn: [https://www.linkedin.com/in/tamara-tava/](https://www.linkedin.com/in/tamara-tava/)
