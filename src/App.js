import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Car from "./images/car.jpeg"
import Card from "react-bootstrap/Card";
import React from "react";
import Vehicles from "./Components/VehiclesJSON.json"
import Accordion from "react-bootstrap/Accordion";
import { Button } from "react-bootstrap";
import ReactDOM from 'react-dom';



function App() {
  ///display category 
  class VehicleCategoryRow extends React.Component {
    render() {
      const category = this.props.category;
      return (
        <tr>
          <th colSpan="2">
            {category}
          </th>
        </tr>
      );
    }
  }

  class VehicleRow extends React.Component {
    ////set const variables to hold qualities of vehicle
    render() {
      const vehicle = this.props.vehicle;
      const model = vehicle.model;
      const year = vehicle.year;
      const price = vehicle.price;
      const commentUser = [];
      var stocked = "";
      if(String(vehicle.stocked) == "true"){
        stocked = "Yes";
      }else if(String(vehicle.stocked) == "false"){
        stocked = "No";
      }
      const make = vehicle.stocked ?
        vehicle.make :
        <span style={{ color: 'red' }}>
          {vehicle.make}
        </span>;
      ///iterate through comments and push to array
      for(var i = 0; i < vehicle.comments.length; i++){
        commentUser.push({
          user: vehicle.comments[i].user,
          comment: vehicle.comments[i].comment,
        })
      }
      return (
        ////vehicle variables
        <div class = "container" id="vehicleHistory">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Accordion>     <Card>

                <Card.Header>

                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    {make}
                  </Accordion.Toggle>
                </Card.Header>

                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                   <b> Model:</b> {model}<br></br>
                   <b>Year:</b> {year}<br></br>
                   <b> Price:</b> {price}<br></br>
                   <b> Stocked: </b>{stocked} <br></br>
                    <br></br>
                    <b>Reviews:</b>
                    {commentUser.map((val) => {
                      return(
                        <table class = "table table-sm">
                          <thead>
                          <tr>
                        <th class="bg-light">{val.user}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr><td>{val.comment}</td></tr>
                        </tbody>
                        </table>
                      )
                    })}
                    
                    
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              </Accordion>

            </Card.Body>
          </Card>
        </div>
      );
    }
  }


  class VehicleTable extends React.Component {
    ///push category to rows and vehicle to rows
    ///set filterText to this.props
    render() {
      const filterText = this.props.filterText;
      const inStockOnly = this.props.inStockOnly;

      const rows = [];
      let lastCategory = null;

      this.props.vehicles.forEach((vehicle) => {
        if (vehicle.make.indexOf(filterText) === -1) {
          return;
        }
        if (inStockOnly && !vehicle.stocked) {
          return;
        }
        if (vehicle.category !== lastCategory) {
          rows.push(
            <VehicleCategoryRow
              category={vehicle.category}
              key={vehicle.category} />
          );
        }
        rows.push(
          <VehicleRow
            vehicle={vehicle}
            key={vehicle.make}
          />
        );
        lastCategory = vehicle.category;
      });

      return (
        <table id = "carTable">
          <thead>
            <tr>
              <th>Car Make</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    }
  }


  class SearchBar extends React.Component {
    ///set search bar and check box to e.target
    constructor(props) {
      super(props);
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
      this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e) {
      this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e) {
      this.props.onInStockChange(e.target.checked);
    }

    render() {
      ////Create top of application (image, searchbar, and checkbox)
      return (
        <form>
          <div class="container" id = "carContainer">
            <Card style={{ width: '18rem' }} id="card">
              <Card.Img variant="top" src={Car} />
              <Card.Body>
                <Card.Title>Ray & Kay's Rental Cars</Card.Title>
              </Card.Body>
            </Card>
            <input
              type="text"
              placeholder="Search..."
              value={this.props.filterText}
              onChange={this.handleFilterTextChange}
            />
            <p>
              <input
                type="checkbox"
                checked={this.props.inStockOnly}
                onChange={this.handleInStockChange}
              />
              {' '}
            Only show Vehicles in stock
          </p>
          </div>
        </form>
      );
    }
  }

  ///largest container on application
  ///bind handleFilterTextChange and handleInStockChange
  ///put search bar and vehicle table in div
  class FilterableVehicleTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        filterText: '',
        inStockOnly: false
      };

      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
      this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(filterText) {
      this.setState({
        filterText: filterText
      });
    }

    handleInStockChange(inStockOnly) {
      this.setState({
        inStockOnly: inStockOnly
      })
    }

    render() {
      return (
        <div id = "container">
          <SearchBar
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            onFilterTextChange={this.handleFilterTextChange}
            onInStockChange={this.handleInStockChange}
          />
          <VehicleTable
            vehicles={this.props.vehicles}
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
          />
        </div>
      );
    }
  }

///render the application
  ReactDOM.render(
    <FilterableVehicleTable vehicles={Vehicles} />,
    document.getElementById('root')
  );

  return (
    <div>
      
    </div>
  );
}

export default App;
