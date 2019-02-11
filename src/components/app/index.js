import React, { Component } from "react";
import TicketList from "../ticket-list";
import "./app.css";
import CurrencyFilter from "../currency-filter";
import StopsFilter from "../stops-filter";
import Service from "../../service";
import Spinner from "../spinner";

class App extends Component {
  service = new Service();
  state = {
    tickets: [],
    currencyValue: "rub",
    filters: [0], // w/o stops as default
    isLoading: true
  };

  componentDidMount() {
    this.service
      .getTickets(
        "https://raw.githubusercontent.com/villione/aviasales-demo/master/src/tickets.json"
      )
      .then(tickets => this.setState({ tickets, isLoading: false }))
	  .catch(e=>console.log(e));
  }

  onFilter = items => {
    const { filters } = this.state;
    if (filters.indexOf(-1) > -1) {
      return items;
    }
    return items.filter(item => {
      return filters.indexOf(item.stops) > -1;
    });
  };

  onStopsFilter = arr => {
    this.setState({ filters: arr });
  };

  OnCurrencyChange = value => {
    this.setState({
      currencyValue: value
    });
  };

  render() {
    let { tickets, filters, currencyValue, isLoading } = this.state;
    if (isLoading) return <Spinner />;

    const visibleItems = this.onFilter(
      tickets.sort((a, b) => a.price - b.price)
    );
    return (
      <div className="App">
        <div className="conteiner">
          <div className="sidebar">
            <div className="filters">
              <CurrencyFilter
                filter={currencyValue}
                onCurrencyChange={this.OnCurrencyChange}
              />
              <StopsFilter
                filter={filters}
                onStopsFilter={this.onStopsFilter}
              />
            </div>
          </div>
          <TicketList currency={currencyValue} items={visibleItems} />
        </div>
      </div>
    );
  }
}

export default App;
