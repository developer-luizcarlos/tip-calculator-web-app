import styles from "./input.module.css";

import Image from "next/image.js";

import { InputHTMLAttributes, RefObject } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError: boolean;
  iconPath?: string;
  ref?: RefObject<HTMLInputElement | null>;
}

const Input: React.FC<InputProps> = ({ hasError, iconPath, ref, ...rest }) => {
  return (
    <div
      className={`${styles.inputWrapper} ${hasError && styles.inputWrapperError}`}
    >
      {iconPath && (
        <Image
          src={iconPath}
          alt="icon"
          aria-hidden="true"
          height={0}
          width={0}
          className={`${styles.icon}`}
        />
      )}
      <input {...rest} ref={ref} className={`${styles.input}`} />
    </div>
  );
};

export default Input;
