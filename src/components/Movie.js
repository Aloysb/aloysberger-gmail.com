import React from 'react';

const Movie = (props) => {
  const {title, poster} = props;
  const NO_IMAGE_FOUND = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';

  return (
    <div className = 'movie'>
      <h2>{(title.length > 40)?title.slice(0,37).concat('...'):title}</h2>
      <img 
        src = {(poster !== 'N/A')?poster:NO_IMAGE_FOUND}
        alt = {`Poster of the movie ${title}`}
      />
    </div>
    );
}

export default Movie;