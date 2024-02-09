import React, {useState} from "react";
// import {useHistory} from 'react-router-dom';
import { Link } from "react-router-dom";
import './App.css';
import data from "./TemplateData.json";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const results = data.filter(val => val.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  };
  return (
    <>
      <h1 className="title1">Yelp for Armenia</h1>
      <div className="searchInput_Container">
        <input 
          id="searchInput" 
          type="text" 
          placeholder=" Search Restaurants here..." 
          value={searchTerm} 
          onChange={(event) => setSearchTerm(event.target.value)} 
          className="input"
        />
        <button onClick={handleSearch} className="search_Button">Search</button>
      </div>
      <div className="template_Container">
        {searchResults.map(val => (
          <div className="template" key={val.id}>
            <div className="withImage">
              <img src={val.image} alt="" className="image"/>
              <h3 className="title">{val.title}</h3> <br/>
              <p className="price">Price category - {val.price}</p>
            </div>
            <div className="descriptionContainer">
              <p className="restDescription"> {val.description}</p>
              <br/>
              <div className="rating">Rating 
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
              </div>
              <button className="moreButton">
                <Link to={val.link} className="link">More...</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
