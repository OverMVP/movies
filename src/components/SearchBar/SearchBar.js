import React, { Component } from 'react';
import './SearchBar.css';
import { Input } from 'antd';

export default class SearchBar extends Component {
  state = {
    input: '',
  };

  componentDidUpdate(_, prevState) {
    if (this.state.input !== prevState.input) {
      this.props.onValueChange(this.state.input);
    }
  }

  onInputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  render() {
    return (
      <div className="searchbar-wrapper">
        <Input onKeyUp={this.onInputChange} placeholder="Type to search..." bordered className="searchbar" />
      </div>
    );
  }
}
