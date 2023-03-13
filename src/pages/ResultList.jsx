import React, { Component } from 'react';
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
        />
      </li>
    );
  }
}

export default ResultList;
