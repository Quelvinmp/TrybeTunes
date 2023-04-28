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
          <div
            className="bg-OxBlue text-neutral-50 min-w-full min-h-screen flex
          flex-col items-center "
          >
            <img
              className="h-44 w-44 rounded-full border-blue-950 border-2 mt-20 mb-4"
              src={ image }
              alt={ name }
              data-testid="profile-image"
            />
            <div className="py-12 text-center">
              <h1>
                Name:
                {' '}
                {name}
              </h1>
              <p>
                Email:
                {' '}
                {email}
              </p>
              <p>
                Description:
                {' '}
                {description}
              </p>
            </div>
            <Link
              to="/profile/edit"
              className="mt-4 btn"
            >
              Editar perfil

            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
