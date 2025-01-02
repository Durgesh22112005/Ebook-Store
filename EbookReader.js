// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './EbookReader.css';

// const EbookReader = ({ match }) => {
//   const [ebook, setEbook] = useState(null);
//   const [bookmark, setBookmark] = useState(null);
//   const ebookId = match.params.id;

//   useEffect(() => {
//     axios.get(`/api/ebooks/${ebookId}`)
//       .then(response => setEbook(response.data))
//       .catch(err => console.error('Error loading ebook', err));

//     axios.get(`/api/bookmarks/${ebookId}`)
//       .then(response => setBookmark(response.data))
//       .catch(err => console.error('Error loading bookmark', err));
//   }, [ebookId]);

//   const updateBookmark = (newPage) => {
//     axios.put(`/api/bookmarks/${ebookId}`, { page: newPage })
//       .then(response => setBookmark(response.data))
//       .catch(err => console.error('Error updating bookmark', err));
//   };

//   return (
//     <div className="ebookreader">
//       <h2>{ebook?.title || 'Ebook Reader'}</h2>
//       {ebook && <img src={ebook.imageUrl} alt={ebook.title} className="reader-image" />}
//       <p>Current Bookmark: {bookmark ? `Page ${bookmark.page}` : 'No bookmark set'}</p>
//       <button onClick={() => updateBookmark(25)}>Set Bookmark to Page 25</button>
//       <div className="ebook-content">
//         {ebook ? (
//           <p>{ebook.content}</p>
//         ) : (
//           <p>Loading ebook content...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EbookReader;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import axios from 'axios';
import './EbookReader.css';

const EbookReader = () => {
  const { id: ebookId } = useParams(); // Destructure the id from useParams
  const [ebook, setEbook] = useState(null);
  const [bookmark, setBookmark] = useState(null);

  useEffect(() => {
    // Fetch the ebook details
    axios.get(`/api/ebooks/${ebookId}`)
      .then(response => setEbook(response.data))
      .catch(err => console.error('Error loading ebook', err));

    // Fetch the bookmark details
    axios.get(`/api/bookmarks/${ebookId}`)
      .then(response => setBookmark(response.data))
      .catch(err => console.error('Error loading bookmark', err));
  }, [ebookId]);

  const updateBookmark = (newPage) => {
    axios.put(`/api/bookmarks/${ebookId}`, { page: newPage })
      .then(response => setBookmark(response.data))
      .catch(err => console.error('Error updating bookmark', err));
  };

  return (
    <div className="ebookreader">
      <h2>{ebook?.title || 'Ebook Reader'}</h2>
      {ebook && <img src={ebook.imageUrl} alt={ebook.title} className="reader-image" />}
      <p>Current Bookmark: {bookmark ? `Page ${bookmark.page}` : 'No bookmark set'}</p>
      <button onClick={() => updateBookmark(25)}>Set Bookmark to Page 25</button>
      <div className="ebook-content">
        {ebook ? (
          <p>{ebook.content}</p>
        ) : (
          <p>Loading ebook content...</p>
        )}
      </div>
    </div>
  );
};

export default EbookReader;
