import styles from "./result.module.css";

import {formatToCurrency} from "@/helpers/formatToCurrency";

interface ResultProps {
	description: string;
	title: string;
	value: number;
}

const Result: React.FC<ResultProps> = ({description, title, value}) => {
	return (
		<dl className={`${styles.result}`}>
			<dt className={`${styles.resultDetails}`}>
				<span className={`${styles.detailsTitle}`}>{title}</span>
				<span className={`${styles.detailsDescription}`}>
					/ {description}
				</span>
			</dt>

			<dd className={`${styles.resultValue}`}>
				{formatToCurrency(value)}
			</dd>
		</dl>
	);
};

export default Result;
