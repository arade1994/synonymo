import cx from "classnames";

import styles from "./Errors.module.scss";

interface Props {
  errors: string[];
  className?: string;
}

const Errors: React.FC<React.PropsWithChildren<Props>> = ({
  errors,
  className,
}) => {
  return (
    errors && (
      <div className={cx(styles.error, className)}>{errors.join(", ")}</div>
    )
  );
};

export default Errors;
