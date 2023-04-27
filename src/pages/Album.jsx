import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      albunsInfo: {},
      albuns: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
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
    const { albunsInfo, albuns } = this.state;
    return (
      <div
        data-testid="page-album"
        className="min-w-full min-h-screen bg-OxBlue text-neutral-50"
      >
        <Header />
        <div className="flex flex-col items-center justify-center m-5">
          <h1
            data-testid="artist-name"
            className=""
          >
            Artist:
            {' '}
            {albunsInfo.artistName}

          </h1>
          <h2 data-testid="album-name">
            Collection:
            {' '}
            {albunsInfo.collectionName}
          </h2>
        </div>
        <ul
          className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3
        xl:grid-cols-4"
        >
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

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
