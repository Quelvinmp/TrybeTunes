import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      favorites: [],
    };
  }

  async componentDidMount() {
    const savedFavorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorites: savedFavorites,
    });
  }

  checkVerify = (newFavorite) => {
    this.setState({ favorites: newFavorite });
  };

  render() {
    const { loading, favorites } = this.state;
    return (
      <div
        className="bg-OxBlue text-neutral-50 min-w-full min-h-screen flex
        flex-col"
        data-testid="page-favorites"
      >
        <Header />
        <p className="text-center mt-5 sm:mb-10 ">Favorites</p>
        <div
          className="my-2 mx-10 md:grid
        md:grid-cols-2 lg:grid-cols-3
        xl:grid-cols-4"
        >
          {loading ? <Loading /> : (
            favorites.map((favorite) => (<MusicCard
              infos={ favorite }
              key={ favorite.trackId }
              checkVerify={ this.checkVerify }
            />))
          )}
        </div>
      </div>
    );
  }
}

export default Favorites;
