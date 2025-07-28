"use client";

import cx from "classnames";

import Errors from "@/app/components/form/Errors/Errors";

import styles from "./Input.module.scss";

interface Props {
  id: string;
  placeholder: string;
  type: string;
  value: string | number;
  errors: string[];
  containerClassName?: string;
  inputClassName?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<React.PropsWithChildren<Props>> = ({
  id,
  placeholder,
  type,
  value,
  errors,
  containerClassName,
  inputClassName,
  onChange,
}) => {
  return (
    <div className={cx(styles.inputContainer, containerClassName)}>
      <input
        className={cx(styles.input, inputClassName)}
        id={id}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
      <Errors errors={errors} />
    </div>
  );
};

export default Input;
