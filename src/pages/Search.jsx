import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      inputSearch: '',
      isDisabled: true,
    };
  }

  enableButton = (inputSearch) => {
    const minimalChar = 2;
    if (inputSearch.length >= minimalChar) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({ inputSearch: value });
    this.enableButton(value);
  };

  render() {
    const { inputSearch, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="banda-artista">
            <input
              type="text"
              name="banda-artista"
              id="banda-artista"
              data-testid="search-artist-input"
              onChange={ this.handleInputChange }
              value={ inputSearch }
            />
          </label>
          <label htmlFor="pesquisar">
            <button
              type="button"
              id="pesquisar"
              data-testid="search-artist-button"
              disabled={ isDisabled }
            >
              Pesquisar

            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
