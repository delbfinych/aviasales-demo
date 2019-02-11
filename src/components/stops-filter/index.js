import React from "react";
import "./stops-filter.css";
const filterInputs = [
  { name: -1, label: "Все" },
  { name: 0, label: "Без пересадок" },
  { name: 1, label: "Одна пересадка" },
  { name: 2, label: "Две пересадки" },
  { name: 3, label: "Три пересадки" }
];

const StopsFilter = ({ filter, onStopsFilter }) => {
  const onChangeHandler = (name, checked) => {
    let arr = filter;

    if (name === -1 && checked) {
      arr = [];
    } else if (name === -1 && !checked) {
      arr = [-1, 0, 1, 2, 3];
    } else if (checked) {
      if (arr.length === 5) {
        arr.splice(arr.indexOf(-1), 1);
      }
      let idx = arr.indexOf(name);
      arr = [...arr.slice(0, idx), ...arr.slice(idx + 1)];
    } else {
      arr.push(name);
      if (arr.length === 4 && arr.indexOf(-1) === -1) arr.unshift(-1);
    }

    onStopsFilter(arr);
  };

  const inputs = filterInputs.map(({ name, label }) => {
    const isChecked = filter.indexOf(name) > -1;

    return (
      <React.Fragment key={name}>
        <label>
          <input
            checked={isChecked}
            onChange={() => onChangeHandler(name, isChecked, false)}
            type="checkbox"
          />
          <span className="checkbox" />
          <span>{label}</span>
        </label>
      </React.Fragment>
    );
  });
  return (
    <div className="stops-filter">
      <span className="amount">КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      {inputs}
    </div>
  );
};
export default StopsFilter;
