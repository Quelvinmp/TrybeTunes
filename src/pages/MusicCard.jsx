import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorited: false,
      check: false,
    };
  }

  // async componentDidUpdate(prevProp, prevState) {
  //   const { check } = this.state;
  //   if (prevState.check !== check && check) {

  //   }
  // }

  componentDidMount() {
    if (localStorage.getItem('favorite_songs')) {
      this.setState({
        loading: true,
        favorited: true,
      });
      // const { favorite } = this.state;
      this.storageVerify();
      this.setState({
        loading: false,
        favorited: false,
        // check: favorite.some(({ trackId: id }) => id === trackId),
      });
    }
  }

  storageVerify = async () => {
    const { infos: { trackId } } = this.props;
    const results = await getFavoriteSongs();
    this.setState({
      check: results.some(({ trackId: id }) => id === trackId),
    });
  };

  handleCheck = async ({ target: { checked } }) => {
    const { checkVerify } = this.props;
    this.setState({
      loading: true,
      favorited: true,
      check: checked,
    });
    const { infos } = this.props;
    if (checked) {
      await addSong(infos);
    } else {
      await removeSong(infos);
      if (checkVerify) checkVerify(JSON.parse(localStorage.getItem('favorite_songs')));
    }
    this.setState({
      loading: false,
      favorited: false,
    });
  };

  render() {
    const { infos: { trackName, previewUrl, trackId } } = this.props;
    const { loading, favorited, check } = this.state;
    return (
      <>
        { (loading && favorited) && <Loading /> }
        <li>
          <p>{trackName}</p>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label
            htmlFor={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
          >
            Favorita
            <input
              type="checkbox"
              name="favorite"
              id={ trackId }
              onChange={ this.handleCheck }
              checked={ check }
            />
          </label>
        </li>
      </>
    );
  }
}

MusicCard.propTypes = {
  infos: PropTypes.shape({
    trackId: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
  checkVerify: PropTypes.func.isRequired,
};

export default MusicCard;
