// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './UserAccounts.css';

// const UserAccounts = () => {
//   const [userInfo, setUserInfo] = useState(null);

//   useEffect(() => {
//     axios.get('/api/account')
//       .then(response => setUserInfo(response.data))
//       .catch(err => console.error('Error loading user account', err));
//   }, []);

//   return (
//     <div className="user-account">
//       <h2>My Account</h2>
//       {userInfo ? (
//         <div>
//           <p>Name: {userInfo.name}</p>
//           <p>Email: {userInfo.email}</p>
//           <p>Download History:</p>
//           <ul>
//             {userInfo.downloadHistory.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>Loading account details...</p>
//       )}
//     </div>
//   );
// };

// export default UserAccounts;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserAccounts.module.css'; // Import the CSS module

const UserAccounts = ({ userId }) => {
    const [ebookLibrary, setEbookLibrary] = useState([]);
    const [downloadHistory, setDownloadHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError('');

            try {
                const libraryResponse = await axios.get(`https://api.yourdomain.com/users/${userId}/library`);
                const historyResponse = await axios.get(`https://api.yourdomain.com/users/${userId}/download-history`);

                setEbookLibrary(libraryResponse.data);
                setDownloadHistory(historyResponse.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load user data. Please try again later.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <div className={styles.userAccountContainer}>
            <h2>Your Account</h2>

            {loading && <p>Loading your library and history...</p>}
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.section}>
                <h3>Your Ebook Library</h3>
                {ebookLibrary.length > 0 ? (
                    <ul className={styles.ebookList}>
                        {ebookLibrary.map((book) => (
                            <li key={book.id} className={styles.ebookItem}>
                                <img src={book.coverUrl} alt={book.title} className={styles.ebookCover} />
                                <div className={styles.ebookDetails}>
                                    <h4>{book.title}</h4>
                                    <p>Author: {book.author}</p>
                                    <button className={styles.downloadBtn}>Download Again</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You have no ebooks in your library.</p>
                )}
            </div>

            <div className={styles.section}>
                <h3>Your Download History</h3>
                {downloadHistory.length > 0 ? (
                    <ul className={styles.historyList}>
                        {downloadHistory.map((historyItem, index) => (
                            <li key={index} className={styles.historyItem}>
                                <p>{historyItem.bookTitle} - Downloaded on {new Date(historyItem.date).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You have no download history.</p>
                )}
            </div>
        </div>
    );
};

export default UserAccounts;
