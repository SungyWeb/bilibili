import React from 'react';
import './life.less';
import {Button} from 'antd';

export default class Life extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 0
    }
    this.handleClick3 = this.handleClick3.bind(this);
  }
  handleClick1() {
    this.setState({
      msg: this.state.msg + 1
    })
  }
  handleClick2 = () => {
    console.log(this);
    this.setState({
      msg: this.state.msg + 1
    })
  }
  handleClick3() {
    console.log(this);
    this.setState({
      msg: this.state.msg + 1
    })
  }
  render() {
    return (
      <div>
        <h1 className="color">hello world!</h1>
        <h3>{this.state.msg}</h3>
        <button onClick={this.handleClick1.bind(this)}>click1</button>
        <button onClick={this.handleClick2}>click2</button>
        <button onClick={this.handleClick3}>click3</button>
        <Button>click me!</Button>
      </div>
    )
  }
}