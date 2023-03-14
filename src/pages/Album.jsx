import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      albunsInfo: {},
      albuns: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.handleMusicsAPI(id);
  }

  handleMusicsAPI = async (id) => {
    const result = await getMusics(id);
    this.setState({
      albunsInfo: result[0],
      albuns: result,
    });
  };

  render() {
    const { params: { id } } = this.props.match;
    const { albunsInfo, albuns } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{albunsInfo.artistName}</h1>
        <h2 data-testid="album-name">{albunsInfo.collectionName}</h2>
        <ul>
          { albuns.slice(1)
            .map((album) => (
              <MusicCard
                infos={ album }
                key={ album.trackId }
              />)) }
        </ul>
      </div>
    );
  }
}

// Album.propTypes = {
//
// };

export default Album;
