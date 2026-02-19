import styles from "./PhoneInput.module.css";
import PHONE_COUNTRIES from "../data/countries-dataset";
import { useState } from "react";

export default function PhoneInput({ errCallback }) {
  const defaultCountry = PHONE_COUNTRIES.find(
    (country) => country.name === "India",
  );
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const signUpOpen = useSelector((state) => state.auth.isSignUpOpen);

  function handleCountryChange(pickedCountry) {
    const country = PHONE_COUNTRIES.find(
      (country) => country.name === pickedCountry,
    );

    setSelectedCountry(country);
  }

  function handlePhoneNumberChange(phNumber) {
    console.log("Hello world");
  }

  return (
    <div className={styles["phone-input-container"]}>
      <label
        htmlFor="country-selector"
        className={styles["country-selector-label"]}
      >
        Mobile Number:
      </label>
      <p className={styles["input-container"]}>
        <select
          name="coutry-selector"
          id="coutry-selector"
          className={styles["dropdown-container"]}
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          <option value={defaultCountry.name}>{defaultCountry.name}</option>
          {PHONE_COUNTRIES.map((country, index) => {
            if (country.name === "India") {
              return;
            }
            return (
              <option key={index} value={country.name}>
                {country.name}
              </option>
            );
          })}
        </select>
        <span
          className={
            signUpOpen
              ? styles["dial-code-wrapper-signup"]
              : styles["dial-code-wrapper-signin"]
          }
        >
          {selectedCountry.dialCode}
        </span>
        <input
          type="number"
          name="phone"
          className={styles["input"]}
          id="phone"
          placeholder="1234567890"
          maxLength={20}
          onChange={(e) => {
            handlePhoneNumberChange(e.target.value);
            errCallback("");
          }}
        />
      </p>
    </div>
  );
}
