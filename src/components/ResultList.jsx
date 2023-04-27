import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class ResultList extends Component {
  render() {
    const { collectionName, artistName, artworkUrl100, collectionId } = this.props;
    return (
      <li className="flex max-w-full m-4 bg-blue-950 p-2 rounded-lg items-stretch">
        <img
          className="rounded-md w-28 h-28 border-2 border-OxBlue self-center"
          src={ artworkUrl100 }
          alt={ artistName }
        />
        <div className="flex flex-col gap-5 w-full p-2 justify-between">
          <p className="">
            Collection:
            {' '}
            {collectionName}
          </p>
          <div className="flex min-w-full justify-between">
            <p>
              Artist:
              {' '}
              {artistName}
            </p>
            <Link
              className="h-fit text-2xl
              hover:text-OxBlue"
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
            >
              <FaPlay />
            </Link>
          </div>
        </div>
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
