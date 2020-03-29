import React, {useState} from 'react';

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
  };


  return(
    <div className = 'search'>
    <form>
      <input 
        type = 'text' 
        value = {searchValue}
        onChange = {handleSearchInputChange}
        placeholder = 'Type a movie here...'
      />
      <input 
        type = 'submit'
        onClick = {callSearchFunction}
        value = 'SEARCH!'
      />
    </form>
    </div>
  );
};

export default Search;