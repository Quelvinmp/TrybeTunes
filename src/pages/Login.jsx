import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AOS from 'aos';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import 'aos/dist/aos.css';

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

  componentDidMount() {
    AOS.init({
      delay: 1000,
    });
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
      <>
        { buttonClicked ? <Loading /> : (
          <div
            data-testid="page-login"
            className="bg-OxBlue min-h-screen flex
            items-center justify-center"
          >
            <form
              className="bg-neutral-50 px-10 pt-10 sm:pt-14 pb-10  rounded-2xl shadow-lg text-center shadow-neutral-100/30 disabled:translate-x-10 duration-1000"
              // data-aos="fade-in"
            >
              <h1
                className="mb-10 sm:mb-14
                font-extrabold text-transparent text-4xl
                sm:text-6xl bg-clip-text bg-gradient-to-tr
                from-blue-600 to-OxBlue
                fade-in
              "
              >
                TrybeTunes
              </h1>
              <label htmlFor="login">
                <input
                  className="w-full block border-2 border-OxBlue rounded-md p-2 mb-4
                  focus:border-OxBlue
                  focus:bg-neutral-100
                  placeholder:italic placeholder:text-sm"
                  type="text"
                  placeholder="Qual o seu nome?"
                  name="login"
                  id="login"
                  data-testid="login-name-input"
                  value={ inputLogin }
                  onChange={ this.handleInputChange }
                />
              </label>
              <label htmlFor="submit">
                <button
                  className="w-full mt-4 btn"
                  id="submit"
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ isDisabled }
                  onClick={ this.onClickButton }
                >
                  Entrar
                </button>
              </label>
            </form>
          </div>
        )}
        { result === 'OK' && <Redirect to="/search" />}

      </>
    );
  }
}

export default Login;
