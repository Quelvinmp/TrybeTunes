import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import ResultList from './ResultList';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      inputSearch: '',
      isDisabled: true,
      searcheds: [],
      buttonClicked: false,
      searchedName: '',
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

  handleButtonClick = async () => {
    const { inputSearch } = this.state;
    this.setState({
      searchedName: inputSearch,
      inputSearch: '',
      buttonClicked: true,
    });
    const result = await searchAlbumsAPIs(inputSearch);
    this.setState({ searcheds: result });
  };

  render() {
    const { inputSearch, isDisabled, searcheds,
      buttonClicked, searchedName } = this.state;
    return (
      <div data-testid="page-search" className="bg-OxBlue text-neutral-50">
        <Header />
        <form className="relative">
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
              onClick={ this.handleButtonClick }
            >
              Pesquisar

            </button>
          </label>
        </form>
        { (buttonClicked && searcheds.length === 0) && <p>Nenhum álbum foi encontrado</p>}
        { (buttonClicked && searcheds.length > 0) && (
          <>
            <p>
              Resultado de álbuns de:
              {' '}
              {searchedName}

            </p>
            <ul>
              { searcheds.map((searched) => (<ResultList
                { ...searched }
                key={ searched.collectionId }
              />)) }
            </ul>
          </>
        )}
      </div>
    );
  }
}

export default Search;
