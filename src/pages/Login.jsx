import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      inputLogin: '',
      isDisabled: true,
      buttonClicked: false,
      result: '',
    };
  }

  enableButton = (inputLogin) => {
    const minimalChar = 3;
    if (inputLogin.length >= minimalChar) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({ inputLogin: value });
    this.enableButton(value);
  };

  onClickButton = async () => {
    const { inputLogin } = this.state;
    this.setState({ buttonClicked: true });
    const result = await createUser({ name: inputLogin });
    this.setState({ result });
  };

  render() {
    const { isDisabled, inputLogin, buttonClicked, result } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login">
            <input
              type="text"
              name="login"
              id="login"
              data-testid="login-name-input"
              value={ inputLogin }
              onChange={ this.handleInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isDisabled }
            onClick={ this.onClickButton }
          >
            Entrar

          </button>
          { buttonClicked && <Loading />}
          { result === 'OK' && <Redirect to="/search" />}
        </form>
      </div>
    );
  }
}

export default Login;
