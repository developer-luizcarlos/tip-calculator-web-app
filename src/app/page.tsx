"use client";

// Icons importation
import iconBill from "../../images/icon-dollar.svg";
import iconPerson from "../../images/icon-person.svg";
import iconLogo from "../../images/logo.svg";

import styles from "./page.module.css";

import Image from "next/image.js";

import InlineError from "@/components/InlineError/InlineError";
import Input from "@/components/Input/Input";
import Result from "@/components/Result/Result";

import { formatToCurrency } from "@/helpers/formatToCurrency";
import { isEmptyString } from "@/helpers/isEmptyString";
import { isValidPercentageFormat } from "@/helpers/isValidPercentageFormat";
import { isValidValue } from "@/helpers/isValidValue";

import { ChangeEvent, useMemo, useRef, useState } from "react";

const Home: React.FC = () => {
  // Constants
  const MAX_BILL_VALUE = 10000;
  const MAX_PERCENTAGE_VALUE = 100;
  const MAX_PEOPLE_VALUE = 15;

  // States
  const [inputBill, setInputBill] = useState("");
  const [inputPercentage, setInputPercentage] = useState("");
  const [inputPeople, setInputPeople] = useState("");

  const [isInputBillInvalid, setIsInputBillInvalid] = useState(false);
  const [isInputPeopleInvalid, setIsInputPeopleInvalid] = useState(false);
  const [isPercentageInvalid, setIsPercentageInvalid] = useState(false);

  const [bill, setBill] = useState<number | null>(null);
  const [percentage, setPercentage] = useState<number | null>(null);
  const [people, setPeople] = useState<number | null>(null);

  // Refs
  const inputBillRef = useRef<HTMLInputElement>(null);
  const inputPeopleRef = useRef<HTMLInputElement>(null);

  // Memoized values
  const inputBillInlineErrorMsg = useMemo(() => {
    if (!isInputBillInvalid) return "";

    if (!isValidValue(inputBill)) {
      return "Wrong format";
    }

    if (+inputBill > MAX_BILL_VALUE) {
      return `Cannot be greater than ${formatToCurrency(MAX_BILL_VALUE)}`;
    }

    return "Cannot be zero";
  }, [isInputBillInvalid, inputBill]);

  const percentageInlineErrorMsg = useMemo(() => {
    if (!isPercentageInvalid) return "";

    if (!isValidPercentageFormat(inputPercentage)) {
      return "Wrong format";
    }

    if (+inputPercentage > MAX_PERCENTAGE_VALUE) {
      return `Cannot be greater than ${MAX_PERCENTAGE_VALUE}`;
    }

    return "Cannot be zero";
  }, [isPercentageInvalid, inputPercentage]);

  const peopleInlineErrorMsg = useMemo(() => {
    if (!isInputPeopleInvalid) return "";

    if (!/^[0-9]+$/.test(inputPeople)) {
      return "Wrong format";
    }

    if (+inputPeople > MAX_PEOPLE_VALUE) {
      return `Cannot be greater than ${MAX_PEOPLE_VALUE}`;
    }

    return "Cannot be zero";
  }, [isInputPeopleInvalid, inputPeople]);

  const tipTotal = useMemo(() => {
    if (percentage && bill) {
      return (percentage / 100) * bill;
    }

    return 0;
  }, [bill, percentage]);

  const tipPerPerson = useMemo(() => {
    if (tipTotal && people) {
      return tipTotal / people;
    }

    return 0;
  }, [people, tipTotal]);

  const isBtnResetDisabled = useMemo(() => {
    return !bill && !percentage && !people;
  }, [bill, percentage, people]);

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

  const handleInputPercentageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = event.target.value;

    const invalidConditions =
      isEmptyString(value) ||
      !isValidPercentageFormat(value) ||
      +value <= 0 ||
      +value > MAX_PERCENTAGE_VALUE;

    setInputPercentage(value);

    setIsPercentageInvalid(invalidConditions);

    setPercentage(() => {
      if (invalidConditions) {
        return null;
      }

      return +value;
    });
  };

  const handleInputPeopleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = event.target.value;

    const invalidConditions =
      isEmptyString(value) ||
      !/^[0-9]+$/.test(value) ||
      +value <= 0 ||
      +value > MAX_PEOPLE_VALUE;

    setInputPeople(value);

    setIsInputPeopleInvalid(invalidConditions);

    setPeople(() => {
      if (invalidConditions) {
        return null;
      }

      return +value;
    });
  };

  const handleBtnPercentageClick = (value: number): void => {
    setPercentage(value);

    setIsPercentageInvalid(false);

    setInputPercentage("");

    inputPeopleRef.current!.focus();
  };

  const handleBtnResetClick = (): void => {
    setInputBill("");
    setInputPercentage("");
    setInputPeople("");

    setIsInputBillInvalid(false);
    setIsInputPeopleInvalid(false);
    setIsPercentageInvalid(false);

    setBill(null);
    setPercentage(null);
    setPeople(null);

    inputBillRef.current!.focus();
  };

  // Helpers
  const isPercentageBtnSelected = (btnValue: number): boolean => {
    return percentage === btnValue && inputPercentage === "";
  };

  return (
    <>
      <Image
        src={iconLogo}
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
          onSubmit={(e) => e.preventDefault()}
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
              iconPath={iconBill}
              id="bill-input"
              maxLength={10}
              ref={inputBillRef}
              placeholder="0"
              value={inputBill}
              onChange={handleInputBillChange}
            />
          </div>
          <div className={`${styles.formField}`}>
            <header className={`${styles.formFieldHeader}`}>
              <label htmlFor="percentage-input" className={`${styles.label}`}>
                Select Tip %
              </label>
              <InlineError
                isShown={isPercentageInvalid}
                label={percentageInlineErrorMsg}
              />
            </header>
            <div className={`${styles.btnSelectTipContainer}`}>
              <button
                type="button"
                aria-current={isPercentageBtnSelected(5)}
                className={`${styles.btn} ${styles.btnPercentage} ${isPercentageBtnSelected(5) && styles.btnSelected}`}
                onClick={() => handleBtnPercentageClick(5)}
              >
                5%
              </button>
              <button
                type="button"
                aria-current={isPercentageBtnSelected(10)}
                className={`${styles.btn} ${styles.btnPercentage} ${isPercentageBtnSelected(10) && styles.btnSelected}`}
                onClick={() => handleBtnPercentageClick(10)}
              >
                10%
              </button>
              <button
                type="button"
                aria-current={isPercentageBtnSelected(15)}
                className={`${styles.btn} ${styles.btnPercentage} ${isPercentageBtnSelected(15) && styles.btnSelected}`}
                onClick={() => handleBtnPercentageClick(15)}
              >
                15%
              </button>
              <button
                type="button"
                aria-current={isPercentageBtnSelected(25)}
                className={`${styles.btn} ${styles.btnPercentage} ${isPercentageBtnSelected(25) && styles.btnSelected}`}
                onClick={() => handleBtnPercentageClick(25)}
              >
                25%
              </button>
              <button
                type="button"
                aria-current={isPercentageBtnSelected(50)}
                className={`${styles.btn} ${styles.btnPercentage} ${isPercentageBtnSelected(50) && styles.btnSelected}`}
                onClick={() => handleBtnPercentageClick(50)}
              >
                50%
              </button>
              <Input
                hasError={isPercentageInvalid}
                id="percentage-input"
                maxLength={3}
                placeholder="0"
                value={inputPercentage}
                onChange={handleInputPercentageChange}
              />
            </div>
          </div>
          <div className={`${styles.formField}`}>
            <header className={`${styles.formFieldHeader}`}>
              <label htmlFor="people-input" className={`${styles.label}`}>
                Number of People
              </label>
              <InlineError
                isShown={isInputPeopleInvalid}
                label={peopleInlineErrorMsg}
              />
            </header>
            <Input
              hasError={isInputPeopleInvalid}
              iconPath={iconPerson}
              id="people-input"
              value={inputPeople}
              ref={inputPeopleRef}
              placeholder="0"
              onChange={handleInputPeopleChange}
            />
          </div>
        </form>
        <aside className={`${styles.dashboard}`}>
          <header>
            <Result
              description="person"
              title="Tip Amount"
              value={tipPerPerson}
            />
            <Result description="person" title="Total" value={tipTotal} />
          </header>
          <button
            disabled={isBtnResetDisabled}
            className={`${styles.btn} ${styles.btnReset}`}
            onClick={handleBtnResetClick}
          >
            RESET
          </button>
        </aside>
      </div>
    </>
  );
};

export default Home;
