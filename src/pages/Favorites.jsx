import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

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
      <div data-testid="page-favorites">
        <Header />
        {loading && <Loading />}
        {favorites.map((favorite) => (<MusicCard
          infos={ favorite }
          key={ favorite.trackId }
          checkVerify={ this.checkVerify }
        />))}
      </div>
    );
  }
}

export default Favorites;
