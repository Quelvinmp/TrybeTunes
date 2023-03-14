import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl } = this.props.infos;
    return (
      <li>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </li>
    );
  }
}

export default MusicCard;
