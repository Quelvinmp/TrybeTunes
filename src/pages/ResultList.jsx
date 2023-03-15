import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ResultList extends Component {
  render() {
    const { collectionName, artistName, artworkUrl100, collectionId } = this.props;
    return (
      <li>
        <img src={ artworkUrl100 } alt={ artistName } />
        <p>{collectionName}</p>
        <p>{artistName}</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Clique Aqui

        </Link>
      </li>
    );
  }
}

ResultList.propTypes = {
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
};

export default ResultList;
