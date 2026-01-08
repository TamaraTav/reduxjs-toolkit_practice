import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";
import { AppDispatch } from "../../store";

export default function CreateCustomer() {
  const [fullName, setFullName] = useState<string>("");
  const [nationalId, setNationalId] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const handleCreateCustomer = () => {
    if (!fullName || !nationalId) return;

    dispatch(createCustomer(fullName, nationalId));
  };

  return (
    <div>
      <h2>Create Customer</h2>
      <div>
        <div>
          <label htmlFor="name">Customer full name</label>
          <input
            type="text"
            id="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="nationalId">Customer Natioanl ID</label>
          <input
            type="text"
            id="nationalId"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>

        <button onClick={handleCreateCustomer}>Create new Customer</button>
      </div>
    </div>
  );
}
