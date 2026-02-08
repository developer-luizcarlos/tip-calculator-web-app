import styles from "./inlineError.module.css";

interface InlineErrorProps {
  isShown: boolean;
  label: string;
}

const InlineError: React.FC<InlineErrorProps> = ({ isShown, label }) => {
  return (
    <p
      aria-live="polite"
      className={`${styles.inlineError} ${!isShown && styles.inlineErrorHidden}`}
    >
      {label}
    </p>
  );
};

export default InlineError;
