import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <nav>
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">Search</Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
