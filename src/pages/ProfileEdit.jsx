import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      pName: '',
      pEmail: '',
      pDescription: '',
      pImage: '',
      isDisabled: true,
      redirect: false,
    };
  }

  async componentDidMount() {
    const { name, email, description, image } = await getUser();
    this.setState({
      isLoading: false,
      pName: name,
      pEmail: email,
      pDescription: description,
      pImage: image,
    }, () => this.enableButton());
  }

  enableButton = () => {
    const { pName, pEmail, pImage, pDescription } = this.state;
    if (this.validEmail(pEmail) && pName.length > 0 && pImage.length > 0
    && pDescription.length > 0) {
      this.setState({ isDisabled: false });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.enableButton);
  };

  validEmail = (email) => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

  handleSubmit = () => {
    const { pName, pEmail, pImage, pDescription } = this.state;
    this.setState({ isLoading: true });
    updateUser({
      name: pName,
      email: pEmail,
      image: pImage,
      description: pDescription,
    });
    this.setState({ redirect: true });
  };

  render() {
    const { isLoading, pName, pEmail, pImage, pDescription, isDisabled,
      redirect } = this.state;
    // if (redirect) return (<Redirect to="/profile" />);
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { redirect && <Redirect to="/profile" /> }
        { isLoading ? <Loading /> : (
          <form>
            <label htmlFor="pName">
              Nome
              <input
                type="text"
                name="pName"
                id="pName"
                data-testid="edit-input-name"
                onChange={ this.handleChange }
                value={ pName }
              />
            </label>

            <label htmlFor="pEmail">
              Email
              <input
                type="text"
                name="pEmail"
                id="pEmail"
                data-testid="edit-input-email"
                onChange={ this.handleChange }
                value={ pEmail }
              />
            </label>

            <label htmlFor="pDescription">
              Descrição
              <input
                type="text"
                name="pDescription"
                id="pDescription"
                data-testid="edit-input-description"
                onChange={ this.handleChange }
                value={ pDescription }
              />
            </label>

            <label htmlFor="pImage">
              Foto
              <input
                type="text"
                name="pImage"
                id="pImage"
                data-testid="edit-input-image"
                onChange={ this.handleChange }
                value={ pImage }
              />
            </label>

            <label htmlFor="button">
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ isDisabled }
                onClick={ this.handleSubmit }
              >
                Enviar

              </button>
            </label>
          </form>
        ) }
      </div>
    );
  }
}

export default ProfileEdit;
