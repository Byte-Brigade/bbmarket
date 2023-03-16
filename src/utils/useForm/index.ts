import { ChangeEvent, useState } from "react";
import { FormData } from "../types/FormData";

export const useForm = (initialValue: FormData, cb: any) => {
  const [values, setValues] = useState(initialValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await cb();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
