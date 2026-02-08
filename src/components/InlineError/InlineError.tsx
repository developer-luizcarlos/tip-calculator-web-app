import styles from "./inlineError.module.css";

interface InlineErrorProps extends React.HTMLAttributes<HTMLElement> {
  isShown: boolean;
  label: string;
}

const InlineError: React.FC<InlineErrorProps> = ({
  isShown,
  label,
  ...rest
}) => {
  return (
    <p
      aria-live="polite"
      aria-hidden={!isShown ? "true" : "false"}
      className={`${styles.inlineError} ${!isShown && styles.inlineErrorHidden}`}
      {...rest}
    >
      {label}
    </p>
  );
};

export default InlineError;
