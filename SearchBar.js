import React, { useState, useEffect, useMemo } from 'react';
import countriesData from './countriesData.json'; // Import JSON data
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  // Debounce function to limit the number of times handleSearch is called
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = (input) => {
    console.log('Input:', input);
    console.log('Data Length:', countriesData.length);

    if (input.length === 0) {
      setFilteredResults([]);
      return;
    }

    if (!Array.isArray(countriesData)) {
      console.error('countriesData is not an array:', countriesData);
      return;
    }

    const filtered = countriesData.filter((country) =>
      country.country.toLowerCase().includes(input.toLowerCase()) ||
      country.capital.toLowerCase().includes(input.toLowerCase())
    );

    console.log('Filtered Results:', filtered);
    setFilteredResults(filtered);
  };

  // Use debounced search function
  const debouncedSearch = useMemo(() => debounce(handleSearch, 300), []);

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by country or capital..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
        aria-label="Search by country or capital"
      />

      {/* Suggestions dropdown */}
      {filteredResults.length > 0 ? (
        <div className="suggestions-list">
          {filteredResults.map((item, index) => (
            <div key={index} className="suggestion-item">
              <strong>{item.country}</strong> - {item.capital}
            </div>
          ))}
        </div>
      ) : query && (
        <div className="no-results">
          No results found.
        </div>
      )}
    </div>
  );
};

export default SearchBar;