import React from "react";
import "./ticket-list-item.css";
import logo from "../../Logo.svg";

function serializeStops(number) {
  if ([0, 5, 6, 7, 8, 9].indexOf(number % 10) > -1) return "ПЕРЕСАДОК";
  else if (number % 10 === 1) return "ПЕРЕСАДКА";
  return "ПЕРЕСАДКИ";
}

function serializeDate(date) {
  let months = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек"
  ];
  let week = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  let arr = date.split(".");
  let day = arr[0],
    month = arr[1],
    year = "20" + arr[2];
  let dayWeek = new Date(year, month - 1, day).getDay();

  return `${day} ${months[month - 1]} ${year}, ${week[dayWeek]}`;
}

function translateCurrency(currency, value) {
  let sign = " ₽";
  if (currency === "rub") return value + sign;
  if (currency === "usd") {
    value /= 65.61;
    sign = " $";
  }
  if (currency === "eur") {
    value /= 74.88;
    sign = " €";
  }
  return (
    value
      .toFixed(3)
      .toString()
      .slice(0, -1) + sign
  );
}
const TicketListItem = ({ currency, item }) => {
  const {
    origin,
    origin_name,
    destination,
    destination_name,
    departure_date,
    departure_time,
    arrival_date,
    arrival_time,
    carrier,
    stops,
    price
  } = item;
  return (
    <li className="ticket-list-item">
      <div className="ticket-list-item__offer">
        <img src={logo} className="ticket-list-item__logo" alt="" />
        <button className="buyBtn">
          <span className="buyBtn-text">
            Купить за {translateCurrency(currency, price)}
          </span>
        </button>
      </div>
      <div className="ticket-list-item__details">
        <div className="ticket-list-item__content">
          <div className="ticket-list-item__origin">
            <span className="time">{departure_time} </span>
            <span className="name">
              {origin}, {origin_name}
            </span>
            <span className="date">{serializeDate(departure_date)} </span>
          </div>
          <div className="ticket-list-item__stops">
            <span>
              {stops} {serializeStops(stops)}
            </span>
          </div>
          <div className="ticket-list-item__destination">
            <span className="time"> {arrival_time} </span>
            <span className="name">
              {destination_name}, {destination}
            </span>
            <span className="date">{serializeDate(arrival_date)} </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TicketListItem;
