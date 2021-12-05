import { useState, useCallback } from "react";

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm((form) => ({ ...form, [name]: value }));
    },
    [form],
  );

  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  const setError = useCallback(
    (name, message) => {
      const key = `${name}Error`;
      setForm((form) => ({ ...form, [key]: message }));
    },
    [form],
  );

  return [form, onChange, setError, reset];
}

export default useInputs;
