"use client";

import styles from "./page.module.css";

import Image from "next/image.js";

import InlineError from "@/components/InlineError/InlineError";
import Input from "@/components/Input/Input";
import Result from "@/components/Result/Result";

import {isEmptyString} from "@/helpers/isEmptyString";
import {isValidValue} from "@/helpers/isValidValue";

import {ChangeEvent, useMemo, useState} from "react";

const Home: React.FC = () => {
	// Constants
	const MAX_BILL_VALUE = 10000;

	// States
	const [inputBill, setInputBill] = useState("");

	const [isInputBillInvalid, setIsInputBillInvalid] = useState(false);

	const [bill, setBill] = useState<number | null>(null);

	// Memoized values
	const inputBillInlineErrorMsg = useMemo(() => {
		if (!isInputBillInvalid) return "";

		if (!isValidValue(inputBill)) {
			return "Wrong format";
		}

		if (+inputBill > MAX_BILL_VALUE) {
			return "Cannot be greater than $10,000.00";
		}

		return "Cannot be zero";
	}, [isInputBillInvalid, inputBill]);

	// Handlers
	const handleInputBillChange = (
		event: ChangeEvent<HTMLInputElement>,
	): void => {
		const value = event.target.value;

		const invalidConditions =
			isEmptyString(value) ||
			!isValidValue(value) ||
			+value <= 0 ||
			+value > MAX_BILL_VALUE;

		setInputBill(value);

		setIsInputBillInvalid(invalidConditions);

		setBill(() => {
			if (invalidConditions) {
				return null;
			}

			return +value;
		});
	};

	return (
		<>
			<Image
				src={"/images/logo.svg"}
				alt="splitter's logo"
				height={0}
				width={0}
				className={`${styles.logo}`}
				loading="eager"
			/>
			<div className={`${styles.calculator}`}>
				<form
					action="#"
					className={`${styles.form}`}
					onSubmit={e => e.preventDefault()}
				>
					<div className={`${styles.formField}`}>
						<header className={`${styles.formFieldHeader}`}>
							<label htmlFor="bill-input" className={`${styles.label}`}>
								Bill
							</label>
							<InlineError
								isShown={isInputBillInvalid}
								label={inputBillInlineErrorMsg}
							/>
						</header>
						<Input
							autoFocus
							hasError={isInputBillInvalid}
							iconPath="/images/icon-dollar.svg"
							id="bill-input"
							maxLength={10}
							placeholder="0"
							value={inputBill}
							onChange={handleInputBillChange}
						/>
					</div>
					<div className={`${styles.formField}`}>
						<header className={`${styles.formFieldHeader}`}>
							<label
								htmlFor="percentage-input"
								className={`${styles.label}`}
							>
								Select Tip %
							</label>
							<InlineError isShown={false} label="Can't be zero" />
						</header>
						<div className={`${styles.btnSelectTipContainer}`}>
							<button className={`${styles.btn} ${styles.btnTip}`}>
								5%
							</button>
							<button className={`${styles.btn} ${styles.btnTip}`}>
								10%
							</button>
							<button className={`${styles.btn} ${styles.btnTip}`}>
								15%
							</button>
							<button className={`${styles.btn} ${styles.btnTip}`}>
								25%
							</button>
							<button className={`${styles.btn} ${styles.btnTip}`}>
								50%
							</button>
							<Input
								hasError={false}
								id="percentage-input"
								placeholder="0"
							/>
						</div>
					</div>
					<div className={`${styles.formField}`}>
						<header className={`${styles.formFieldHeader}`}>
							<label htmlFor="people-input" className={`${styles.label}`}>
								Number of People
							</label>
							<InlineError isShown={false} label="Can't be zero" />
						</header>
						<Input
							hasError={false}
							iconPath="/images/icon-person.svg"
							id="people-input"
							placeholder="0"
						/>
					</div>
				</form>
				<aside className={`${styles.dashboard}`}>
					<header>
						<Result description="person" title="Tip Amount" value={0} />
						<Result description="person" title="Total" value={0} />
					</header>
					<button className={`${styles.btn} ${styles.btnReset}`}>
						RESET
					</button>
				</aside>
			</div>
		</>
	);
};

export default Home;
