import React from "react";
import "./currency-filter.css";

const filterButtons = [
  { name: "rub", label: "RUB" },
  { name: "usd", label: "USD" },
  { name: "eur", label: "EUR" }
];

const CurrencyFilter = ({ filter, onCurrencyChange }) => {
  const buttons = filterButtons.map(({ name, label }) => {
    const isActive = name === filter;
    const classNames = "btn " + (isActive ? "active" : "");
    return (
      <button
        key={name}
        type="button"
        onClick={() => onCurrencyChange(name)}
        className={classNames}
      >
        {label}
      </button>
    );
  });
  return (
    <div className="currency-filter">
      <span>валюта</span>
      <div className="btn-group">{buttons}</div>
    </div>
  );
};
export default CurrencyFilter;
