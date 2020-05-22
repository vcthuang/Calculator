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
    if (newDisplay === "0")
      newDisplay = display;
    else
      newDisplay = this.state.display + display;

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

    // const others = [
    //   {id: "decimal", letter: "."},
    //   {id: "clear", letter: "AC"},
    //   {id: "equals", letter: "="}
    // ];

    return (
      <div className = "calculator">
        <div className="card bg-dark text-secondary">
          <div className="card-header text-right" id="display">
            <h1>{this.state.display}</h1>
          </div>
          
          <div className="card-body">
            <div className = "row">       
              
              <div className = "col-sm-9">
                {numbers.map (data => (  
                  <Keypad 
                    className = "rounded-circle btn btn-secondary col-sm-3 m-2 p-1"
                    id = {data.id}
                    letter = {data.letter}
                    handleDisplay = {this.handleDisplay}
                    />
                ))}
              </div>
              
              <div className = "col-sm-3">
                {Operators.map (data => (
                  <Keypad
                    className = "rounded-circle btn btn-info col-sm-12 m-2"
                    id = {data.id}
                    letter = {data.letter}
                    handleDisplay = {this.handleDisplay}
                    />
                ))}
              </div>
              
              <div className="w-100"></div>

              <div className = "col-sm-3"></div>
                <div
                  className = "rounded-circle btn btn-warning col-sm-2 mr-3"
                  id = "clear"
                  onClick = {this.onClickAC}>
                  <h4>AC</h4>    
                </div>
                <div
                  className = "rounded-circle btn btn-success col-sm-3 ml-5"
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
