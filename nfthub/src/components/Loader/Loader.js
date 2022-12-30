import React from 'react';
import './Loader.css';
import { MutatingDots } from 'react-loader-spinner';

function Loader() {
  return (
      <MutatingDots 
        height="100"
        width="100"
        color="#00eaff"
        secondaryColor= '#fa3e09'
        radius='12.5'
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
  );
}

export default Loader;