import React, { Component } from 'react';
import './Header.css';

import { Tabs } from 'antd';

const items = [
  {
    key: 'Search',
    label: 'Search',
  },
  {
    key: 'Rated',
    label: 'Rated',
  },
];

export default class Header extends Component {
  state = {
    activeKey: '',
  };

  onKeyChanged = (activeKey) => {
    if (activeKey === 'Search') {
      this.setState(() => {
        return {
          activeKey: activeKey,
        };
      });
      this.props.isSearchActive(activeKey);
    }

    if (activeKey === 'Rated') {
      this.props.isSearchActive(activeKey);
    }
  };

  componentDidUpdate(_, prevState) {}

  render() {
    return (
      <div className="header">
        <Tabs items={items} onChange={this.onKeyChanged} defaultActiveKey="Search" />
      </div>
    );
  }
}
