import React from "react";
import TicketListItem from "../ticket-list-item";
import "./ticket-list.css";

let maxId = 100;

const TicketList = ({ currency, items }) => {
  const renderItems = items.map(item => {
    return <TicketListItem currency={currency} key={maxId++} item={item} />;
  });

  return <ul> {renderItems} </ul>;
};

export default TicketList;
