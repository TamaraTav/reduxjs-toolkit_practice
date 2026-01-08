import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";
import { AppDispatch } from "../../store";

export default function CreateCustomer() {
  const [fullName, setFullName] = useState<string>("");
  const [nationalId, setNationalId] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dispatch = useDispatch<AppDispatch>();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
    }

    if (!nationalId.trim()) {
      newErrors.nationalId = "National ID is required";
    } else if (!/^\d+$/.test(nationalId.trim())) {
      newErrors.nationalId = "National ID must contain only numbers";
    } else if (nationalId.trim().length < 5) {
      newErrors.nationalId = "National ID must be at least 5 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateCustomer = (e?: FormEvent) => {
    e?.preventDefault();

    if (!validateForm()) return;

    dispatch(createCustomer(fullName.trim(), nationalId.trim()));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreateCustomer();
    }
  };

  return (
    <div>
      <h2>Create Customer</h2>
      <form onSubmit={handleCreateCustomer}>
        <div>
          <label htmlFor="name">Customer full name</label>
          <input
            type="text"
            id="name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) {
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.fullName;
                  return newErrors;
                });
              }
            }}
            onKeyPress={handleKeyPress}
          />
          {errors.fullName && (
            <div style={{ color: "red" }}>{errors.fullName}</div>
          )}
        </div>

        <div>
          <label htmlFor="nationalId">Customer National ID</label>
          <input
            type="text"
            id="nationalId"
            value={nationalId}
            onChange={(e) => {
              setNationalId(e.target.value);
              if (errors.nationalId) {
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.nationalId;
                  return newErrors;
                });
              }
            }}
            onKeyPress={handleKeyPress}
          />
          {errors.nationalId && (
            <div style={{ color: "red" }}>{errors.nationalId}</div>
          )}
        </div>

        <button type="submit">Create new Customer</button>
      </form>
    </div>
  );
}
