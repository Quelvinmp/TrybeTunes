import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import ResultList from '../components/ResultList';

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
      <div
        data-testid="page-search"
        className="bg-OxBlue text-neutral-50 min-w-full min-h-screen flex
      flex-col"
      >
        <Header />
        <form
          className="flex items-center justify-around mt-5
          sm:justify-center sm:gap-10 sm:mt-14
        "
        >
          <label htmlFor="banda-artista">
            <input
              className="placeholder:italic border-2 border-OxBlue rounded-md p-2
              focus:border-OxBlue
              focus:bg-neutral-100
              placeholder:italic placeholder:text-sm text-black
              "
              type="text"
              name="banda-artista"
              id="banda-artista"
              data-testid="search-artist-input"
              placeholder="Artista / Banda / Música"
              onChange={ this.handleInputChange }
              value={ inputSearch }
            />
          </label>
          <label htmlFor="pesquisar">
            <button
              className="bg-blue-600 p-3 border-OxBlue border-2
              rounded-lg hover:bg-blue-900 text-neutral-50"
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
        { (buttonClicked && searcheds.length === 0)
        && (
          <p
            className="m-auto"
          >
            Nenhum álbum foi encontrado
          </p>)}
        { (buttonClicked && searcheds.length > 0) && (
          <>
            <p className="text-center mt-5 sm:mb-10 mb-5">
              Resultado de álbuns de:
              {' '}
              {searchedName}

            </p>
            <ul
              className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3
              xl:grid-cols-4 min-w-full"
            >
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
