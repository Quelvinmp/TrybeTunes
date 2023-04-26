import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      profile: {},
    };
  }

  async componentDidMount() {
    const result = await getUser();
    this.setState({
      isLoading: false,
      profile: result,
    });
  }

  render() {
    const { isLoading, profile: { name, email, image, description } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading /> : (
          <>
            <h1>{name}</h1>
            <p>{email}</p>
            <p>{description}</p>
            <img
              src={ image }
              alt={ name }
              data-testid="profile-image"
            />
            <Link to="/profile/edit">Editar perfil</Link>
          </>
        )}
      </div>
    );
  }
}

export default Profile;
