import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Catalog.css';

const Catalog = () => {
  const [ebooks, setEbooks] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');

  // Sample data to simulate API response
  const sampleEbooks = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      price: 10.99,
      imageUrl: './images/The Great Gatsby.jpg'
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      genre: 'Fiction',
      price: 9.99,
      imageUrl: './images/1984.jpg'
    },
    {
      id: 3,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      price: 12.99,
      imageUrl: './images/To Kill a mockingbird.jpg'
    },
    {
      id: 4,
      title: 'The Selfish Gene',
      author: 'Richard Dawkins',
      genre: 'Non-Fiction',
      price: 14.99,
      imageUrl: './images/The Selfish Gene.jpg'
    },
    {
      id: 5,
      title: 'Becoming',
      author: 'Michelle Obama',
      genre: 'Non-Fiction',
      price: 16.99,
      imageUrl: './images/Becoming.jpg'
    },
    {
      id: 6,
      title: 'The Da Vinci Code',
      author: 'Dan Brown',
      genre: 'Mystery',
      price: 11.99,
      imageUrl: './images/The Da Vinci code.jpg'
    },
    {
      id: 7,
      title: 'Dune',
      author: 'Frank Herbert',
      genre: 'Sci-Fi',
      price: 13.99,
      imageUrl: './images/Dune.jpg'
    },
    {
      id: 8,
      title: 'The Martian',
      author: 'Andy Weir',
      genre: 'Sci-Fi',
      price: 14.99,
      imageUrl: './images/The Martian.jpg'
    },
    {
      id: 9,
      title: 'Educated',
      author: 'Tara Westover',
      genre: 'Non-Fiction',
      price: 15.99,
      imageUrl: './images/Educated.jpg'
    },
    {
      id: 10,
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      genre: 'Mystery',
      price: 12.99,
      imageUrl: './images/The Silent Patient.jpg'
    }
    ,
    {
        id: 11,
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien ',
        genre: 'Fiction',
        price: 16.00,
        imageUrl: './images/The lord of the rings.jpg'
      }
      ,
      {
        id: 12,
        title: 'The Count of Monte Cristo',
        author: 'Alexandre Dumas père',
        genre: 'Mystery',
        price: 14.50,
        imageUrl: './images/The count of monte cristo.jpg'
      }
  ];

  useEffect(() => {
    // Simulating an API call
    setEbooks(sampleEbooks);
  }, []);

  const filteredEbooks = ebooks.filter(ebook => 
    (genre === 'All' || ebook.genre === genre) &&
    ebook.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="catalog">
      <h2>Catalog</h2>
      {error && <p className="error-message">{error}</p>}
      
      <div className="catalog-filters">
        <input 
          type="text" 
          placeholder="Search for ebooks" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="search-input"
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)} className="genre-select">
          <option value="All">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>
      </div>
      
      {filteredEbooks.length === 0 ? (
        <p>No ebooks found.</p>
      ) : (
        <div className="ebook-list">
          {filteredEbooks.map(ebook => (
            <div key={ebook.id} className="ebook-item">
              <img src={ebook.imageUrl} alt={ebook.title} className="ebook-image" />
              <div className="ebook-details">
                <h3 className="ebook-title">{ebook.title}</h3>
                <p className="ebook-author">{ebook.author}</p>
                <p className="ebook-genre">{ebook.genre}</p>
                <p className="ebook-price">${ebook.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
