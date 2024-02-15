import { useState } from 'react';
import data from '../data/TemplateData.json';
import { Link } from 'react-router-dom';
import Rating from './Rating.js';

function SearchInputContainer({
  searchTerm,
  setSearchTerm,
  handleSearch,
  handleOnKeyDown,
}) {
  return (
    <div className="searchInput_Container">
      <input
        id="searchInput"
        type="text"
        placeholder=" Search Restaurants here..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={handleOnKeyDown}
        className="input"
      />
      <button onClick={handleSearch} className="search_Button">
        Search
      </button>
    </div>
  );
}

function RestaurantTemplateContainer({ searchResults, searchTerm }) {
  return (
    <div className="template_Container">
      {searchTerm && searchResults.length === 0 ? (
        <p className="noRestaurant">No such Restaurant</p>
      ) : (
        searchResults.map((val) => (
          <div className="template" key={val.id}>
            <div className="withImage">
              <img src={val.image} alt="" className="image" />
              <h3 className="title">{val.title}</h3> <br />
            </div>
            <div className="descriptionContainer">
              <p className="restDescription"> {val.description}</p> <br />
              <p className="price">Price category - {val.price}</p> <br />
              <div className="ratingPart">
                {' '}
                Rate
                <Rating eachRestaurant={val} initialRating={val.currentRating} rated={false} />
                {/* <p>{val.currentRating}</p> */}
              </div>
              <button className="moreButton">
                <Link to={val.link} className="link">
                  More...
                </Link>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const results = data.filter((val) =>
      val.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setSearchResults(results);
  };

  const handleOnKeyDown = (event) => {
    if (event.keyCode === 13) {
      const results = data.filter((val) =>
        val.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setSearchResults(results);
    }
  };

  return (
    <>
      <SearchInputContainer
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        handleOnKeyDown={handleOnKeyDown}
      />
      <RestaurantTemplateContainer
        searchResults={searchResults}
        searchTerm={searchTerm}
      />
    </>
  );
}

export default Search;
