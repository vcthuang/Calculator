import React, { Component } from "react";
import Keypad from './KeyPad';

export default class Calculator extends Component {
  constructor (props) {
    super (props);
    this.state = {
      display: "0"
    }
  };

  handleDisplay = display => {
    let newDisplay = this.state.display;
    const lastInput = newDisplay[newDisplay.length - 1];
    let secondLast= null;
    let found = null;

    if (newDisplay.length > 1) {
      secondLast = newDisplay[newDisplay.length - 2];
      const regex = /(\d*\.\d*)$/;
      //const regex = /(\d*[.]\d*)$/;
      found = newDisplay.match(regex);
    }
    
    switch (display) {
      case ".":
        if (!found)
          newDisplay = this.state.display + display;
        break;
      case "-": 
        // -- => +
        if (lastInput === '-') 
          newDisplay = newDisplay.slice(0, -1) + "+";
        else
          newDisplay = this.state.display + display;
        break;
      case "+":
      case "*":
      case "/":
        // * - + => +, use last operator
        if ((lastInput === "+") || (lastInput === "/") || (lastInput === "*"))
          newDisplay = newDisplay.slice(0, -1) + display;
        // * - operations on negative number is allowed
        else if ( (lastInput === "-") && 
          ((secondLast === "+") || (secondLast === "/") || (secondLast === "*")) )
          newDisplay = newDisplay.slice(0, -2) + display;
        else
          newDisplay = this.state.display + display;
        break;
      default:
        if (newDisplay === "0")
          newDisplay = display;
        else
          newDisplay = this.state.display + display;
    }

    this.setState({display: newDisplay});
  }

  onClickAC= () => {
    this.setState({display: "0"});
  }

  onClickEquals= () => {
    let answer = eval(this.state.display);
    this.setState({display: answer});
  }
  
  render() {
    const numbers = [
      {id: "zero", letter: "0"}, 
      {id: "one", letter: "1"}, 
      {id: "two", letter: "2"}, 
      {id: "three", letter: "3"}, 
      {id: "four", letter: "4"}, 
      {id: "five", letter: "5"}, 
      {id: "six", letter: "6"}, 
      {id: "seven", letter: "7"},
      {id: "eight", letter: "8"},
      {id: "nine", letter: "9"},
      {id: "decimal", letter: "."}
    ];

    const Operators = [
      {id: "add", letter: "+"}, 
      {id: "subtract", letter: "-"},
      {id: "multiply", letter: "*"}, 
      {id: "divide", letter: "/"}
    ]

    return (
      <div className = "calculator">
        <div className="card bg-dark text-secondary">
          <div className="card-header text-right" id="display">
            <h1>{this.state.display}</h1>
          </div>
          
          <div className="card-body">
            <div className = "row">       
              
              <div className = "col-9">
                {numbers.map (data => (  
                  <Keypad 
                    className = "rounded-circle btn btn-secondary col-3 m-2 p-1"
                    id = {data.id}
                    letter = {data.letter}
                    handleDisplay = {this.handleDisplay}
                    />
                ))}
              </div>
              
              <div className = "col-3">
                {Operators.map (data => (
                  <Keypad
                    className = "rounded-circle btn btn-info col-12 m-2"
                    id = {data.id}
                    letter = {data.letter}
                    handleDisplay = {this.handleDisplay}
                    />
                ))}
              </div>
              
              <div className="w-100"></div>

              <div className = "col-3"></div>
                <div
                  className = "rounded-circle btn btn-warning col-2 mr-3"
                  id = "clear"
                  onClick = {this.onClickAC}>
                  <h4>AC</h4>    
                </div>
                <div
                  className = "rounded-circle btn btn-success col-3 ml-5"
                  id = "equals"
                  onClick = {this.onClickEquals}>
                  <h4>=</h4>    
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}
