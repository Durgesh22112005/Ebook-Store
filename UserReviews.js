// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './UserReviews.css'; // Custom styles for the reviews section

// const UserReviews = ({ bookId }) => {
//     const [reviews, setReviews] = useState([]);
//     const [newReview, setNewReview] = useState('');
//     const [rating, setRating] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         // Fetch existing reviews when component loads
//         const fetchReviews = async () => {
//             try {
//                 const response = await axios.get(`https://api.yourdomain.com/books/${bookId}/reviews`);
//                 setReviews(response.data);
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchReviews();
//     }, [bookId]);

//     const handleSubmitReview = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');

//         const reviewData = {
//             review: newReview,
//             rating,
//         };

//         try {
//             // Submit the review using a POST request
//             await axios.post(`https://api.yourdomain.com/books/${bookId}/reviews`, reviewData, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             // Append the new review to the list of reviews
//             setReviews([...reviews, { review: newReview, rating }]);
//             setNewReview('');
//             setRating(0);
//             setLoading(false);
//         } catch (err) {
//             setError('Error submitting the review. Please try again.');
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="reviews-container">
//             <h2>User Reviews</h2>

//             {loading && <p>Submitting your review...</p>}
//             {error && <p className="error">{error}</p>}

//             <div className="reviews-list">
//                 {reviews.length > 0 ? (
//                     reviews.map((review, index) => (
//                         <div key={index} className="review-item">
//                             <p className="review-text">{review.review}</p>
//                             <p className="review-rating">Rating: {review.rating}/5</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No reviews yet. Be the first to review!</p>
//                 )}
//             </div>

//             <form className="review-form" onSubmit={handleSubmitReview}>
//                 <h3>Submit Your Review</h3>
//                 <div className="form-group">
//                     <label htmlFor="rating">Rating:</label>
//                     <select
//                         id="rating"
//                         value={rating}
//                         onChange={(e) => setRating(Number(e.target.value))}
//                         required
//                     >
//                         <option value="0">Select a rating</option>
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                         <option value="4">4</option>
//                         <option value="5">5</option>
//                     </select>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="review">Your Review:</label>
//                     <textarea
//                         id="review"
//                         value={newReview}
//                         onChange={(e) => setNewReview(e.target.value)}
//                         rows="4"
//                         required
//                     ></textarea>
//                 </div>
//                 <button type="submit" className="submit-btn" disabled={loading || rating === 0}>
//                     Submit Review
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default UserReviews;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserReviews.css'; // Custom styles for the reviews section

const UserReviews = ({ bookId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // New state for success message

    useEffect(() => {
        // Fetch existing reviews when component loads
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`https://api.yourdomain.com/books/${bookId}/reviews`);
                setReviews(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchReviews();
    }, [bookId]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        // Validation for empty rating or review
        if (rating === 0 || newReview.trim() === '') {
            alert('Please provide both a rating and a review.');
            setLoading(false);
            return; // Stop form submission if validation fails
        }

        const reviewData = {
            review: newReview,
            rating,
        };

        try {
            // Submit the review using a POST request
            await axios.post(`https://api.yourdomain.com/books/${bookId}/reviews`, reviewData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Append the new review to the list of reviews
            setReviews([...reviews, { review: newReview, rating }]);
            setNewReview('');
            setRating(0);
            setLoading(false);

            // Set the success message
            setSuccessMessage('Your review has been successfully submitted!');
        } catch (err) {
            setError('Error submitting the review. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="reviews-container">
            <h2>User Reviews</h2>

            {loading && <p>Submitting your review...</p>}
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>} {/* Display success message */}

            <div className="reviews-list">
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="review-item">
                            <p className="review-text">{review.review}</p>
                            <p className="review-rating">Rating: {review.rating}/5</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to review!</p>
                )}
            </div>

            <form className="review-form" onSubmit={handleSubmitReview}>
                <h3>Submit Your Review</h3>
                <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        required
                    >
                        <option value="0">Select a rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="review">Your Review:</label>
                    <textarea
                        id="review"
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={loading || rating === 0}>
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default UserReviews;
