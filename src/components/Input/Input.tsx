import styles from "./input.module.css";

import Image from "next/image.js";

import {InputHTMLAttributes} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	hasError: boolean;
	iconPath?: string;
}

const Input: React.FC<InputProps> = ({hasError, iconPath, ...rest}) => {
	return (
		<div
			className={`${styles.inputWrapper} ${hasError && styles.inputWrapperError}`}
		>
			{iconPath && (
				<Image
					src={iconPath}
					alt="icon"
					height={0}
					width={0}
					className={`${styles.icon}`}
				/>
			)}
			<input {...rest} className={`${styles.input}`} />
		</div>
	);
};

export default Input;
