import React, { Component } from 'react';

export default class Keypad extends Component {

  onClick = () => {
    this.props.handleDisplay (this.props.letter)
  }

  render() {
    return (
      <div
        className = {this.props.className}
        id = {this.props.id}
        onClick = {this.onClick}>
        <h4>{this.props.letter}</h4>    
      </div>
    )
  }
}
