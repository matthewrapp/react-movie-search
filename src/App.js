import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import MovieList from './components/MovieList';
import SearchBox from './components/SearchBox';
import MovieListHeading from './components/MovieListHeading';
import AddFav from './components/AddFav';
import RemoveFav from './components/RemoveFav';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavs] = useState([]);

  const getMovieRequest = async (searchValue) => {
    let url;
    if (searchValue === '') {
      url = `http://www.omdbapi.com/?s=marvel&apikey=77214f42`;
    } else {
      url = `http://www.omdbapi.com/?s=${searchValue}&apikey=77214f42`;
    }

		const response = await fetch(url);
    const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

  useEffect(() => {
    const movieFavs = JSON.parse(localStorage.getItem('movie-favs'));
    if (movieFavs !== null) {
      setFavs(movieFavs);
    }
  }, []);
  
  const addFavoriteMovie = (movie) => {
    const newFavList = [...favorites, movie];
    setFavs(newFavList);
    saveToLocalStorage(newFavList);
  };

  const removeFavoriteMovie = (movie) => {
		const newFavList = favorites.filter(
			(favorite) => favorite.imdbID !== movie.imdbID
		);
    setFavs(newFavList);
    saveToLocalStorage(newFavList);
  };
  
  const saveToLocalStorage = (items) => {
    localStorage.setItem('movie-favs', JSON.stringify(items));
  };
	
	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movie API' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row movies-row hide-native-scrollbar' >
				<MovieList movies={movies} favComp={AddFav} handleFavClick={addFavoriteMovie} />
      </div>
      {favorites.length > 0 &&
        <div className='row d-flex align-items-center mt-4'>
          <MovieListHeading heading='Favorites' />
        </div>
      }
      <div className='row movies-row'>
          <MovieList movies={favorites} favComp={RemoveFav} handleFavClick={removeFavoriteMovie}/>
        </div>
		</div>
	);
};

export default App;