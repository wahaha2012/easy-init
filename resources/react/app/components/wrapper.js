import React, {Component} from 'react';

export class Wrapper extends Component {
  render(){
    return (
      <div>
      {this.props.children}
      </div>
    )
  }
}
