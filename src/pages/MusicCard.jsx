import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

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

  handleCheck = async ({ target: { checked } }) => {
    this.setState({
      loading: true,
      favorited: true,
      check: checked,
    });
    const { infos } = this.props;
    if (checked) {
      await addSong(infos);
    }
    this.setState({
      loading: false,
      favorited: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props.infos;
    // const { handleCheck, check } = this.props;
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
              // onChange={ handleCheck }
              onChange={ this.handleCheck }
              checked={ check }
            />
          </label>
        </li>
      </>
    );
  }
}

export default MusicCard;
