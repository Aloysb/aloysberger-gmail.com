import React, {useEffect, useReducer} from 'react';
import Header from './Header.js';
import Search from './Search.js';
import Movie from './Movie.js';
import Footer from './Footer.js';
import Results from './Results.js';
import '../App.css';

  const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

  const initialState = {
    loading: true,
    errorMessage: null,
    movies: [],
    page: 1,
    searchValue: '',
  }

  const reducer = (state, action) => {
    console.log(state.page);
    switch(action.type) {
      case 'SEARCH_MOVIE_REQUEST':
        return {
          ...state,
          loading: true,
          errorMessage: null,
        };

      case 'SEARCH_MOVIE_SUCCESS':
        return{
          ...state,
          loading: false,
          movies: action.payload,
          searchValue: action.searchValue,
        };

      case 'SEARCH_MOVIE_FAILURE':
        return{
          ...state,
          loading: false,
          errorMessage: action.error,
          page: 1,
        }

      case 'NEXT_PAGE':
        return{
          ...state,
          page: state.page + 1,
        }


      case 'PREVIOUS_PAGE':
        return{
          ...state,
          page: state.page - 1,
        }

      default:
        return state;
    }
  }

const App = () =>{
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(responseJson => {
        dispatch({
          type: 'SEARCH_MOVIE_SUCCESS',
          payload: responseJson.Search,
        })
      });
  },[]);

  const nextPage = () => {
    dispatch({
      type: 'NEXT_PAGE'
    });
    const {searchValue, page} = state;
    search(searchValue, page);
  }

  const previousPage = () => {
    dispatch({
      type: 'PREVIOUS_PAGE'
    });
    const {searchValue, page} = state;
    search(searchValue, page);
  }

  const search = (searchValue, page = 1) => {
    dispatch({
      type:'SEARCH_MOVIE_REQUEST'
    });
  
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b&page=${page}`)
      .then(response => response.json())
      .then(responseJson => {
        if(responseJson.Response === 'True'){
          dispatch({
            type: 'SEARCH_MOVIE_SUCCESS',
            payload: responseJson.Search,
            searchValue: searchValue,
            page: page,
          });
        } else {
          dispatch({
            type: 'SEARCH_MOVIE_FAILURE',
            error: responseJson.Error,
          });
        };
      });
  };

  const {movies, loading, errorMessage} = state;

  return (
    <div className="app">
      <Header title = 'MovieBase'/>
      <Search search = {search} />
      <p className = 'app__intro'>Looking for a movie? Use the search bar above!</p>
      <div className = 'movies'>
        {loading && !errorMessage ? (
          <span>loading ...</span>
          ): errorMessage ?(
            <span className = 'errorMessage'>Error: {errorMessage}</span>
            ):(movies.map((movie,index) => {
                let {Title, Poster} = movie;
                return(
                  <Movie key = {index} title = {Title} poster = {Poster}/>
                );
              }))
        }
        <Results nextPage = {nextPage} previousPage = {previousPage}/>
      </div>
      <Footer />
    </div>
  );
};

export default App;


//LEFT TO DO:

// [X]MAKE THE TITLE OF THE MOVIE A BIT PRETTIER
// [X] ADD A FOOTER
// [X] MAKE SURE THE CARD ALIGN (SOME ISSUE WITH THE TITLE IF IT IS LIKE 3 LINES (TYPE 'TEST'))
// [ ] DEPLOY!
// [X] SEE MORE TO DISPLAY MORE THAN 10 RESULTS