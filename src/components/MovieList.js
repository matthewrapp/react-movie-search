import React from 'react';

const MovieList = (props) => {
	const FavComp = props.favComp;
	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3' key={movie.imdbID}>
					<img src={movie.Poster} alt='movie'></img>
                    <div className='overlay d-flex align-items-center justify-content-center'
                        onClick={() => props.handleFavClick(movie)}
                    >
						<FavComp />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
