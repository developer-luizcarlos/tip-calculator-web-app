"use client";

import styles from "./page.module.css";

import Image from "next/image.js";

import InlineError from "@/components/InlineError/InlineError";
import Input from "@/components/Input/Input";
import Result from "@/components/Result/Result";

const Home: React.FC = () => {
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
							<InlineError isShown={false} label="Can't be zero" />
						</header>
						<Input
							autoFocus
							hasError={false}
							iconPath="/images/icon-dollar.svg"
							id="bill-input"
							placeholder="0"
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
