import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      userName: '',
    };
  }

  fetchUser = async () => {
    const result = await getUser();
    this.setState({ loading: false, userName: result.name });
  };

  render() {
    const { loading, userName } = this.state;
    this.fetchUser();
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : <h1 data-testid="header-user-name">{userName}</h1>}
      </header>
    );
  }
}

export default Header;
