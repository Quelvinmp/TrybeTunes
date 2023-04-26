import React, { Component } from 'react';
import { FaSpinner } from 'react-icons/fa';

class Loading extends Component {
  render() {
    return (
      <div
        className="flex
      min-h-screen min-w-full items-center justify-center bg-OxBlue
      text-neutral-50 text-2xl"
      >
        <FaSpinner className="animate-spin h-6 text-2xl mr-2" />
        <p className="">Carregando...</p>
      </div>
    );
  }
}

export default Loading;
