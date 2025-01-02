// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Checkout.css';

// const Checkout = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [address, setAddress] = useState('');
//     const [cardNumber, setCardNumber] = useState('');
//     const [expiryDate, setExpiryDate] = useState('');
//     const [cvv, setCvv] = useState('');
//     const [deliveryOption, setDeliveryOption] = useState('email');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [orders, setOrders] = useState([]);
//     const [editingOrder, setEditingOrder] = useState(null);

//     const apiUrl = 'http://localhost:8080/orders'; // API URL for the orders

//     // Fetch the list of orders on component mount
//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     const fetchOrders = async () => {
//         try {
//             const response = await axios.get(apiUrl);
//             setOrders(response.data); // Set orders from the response
//         } catch (err) {
//             console.error('Error fetching orders:', err);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         setSuccess('');

//         const orderData = {
//             name,
//             email,
//             address: deliveryOption === 'postal' ? address : null, // Address only for postal delivery
//             cardNumber,
//             expiryDate,
//             cvv,
//             deliveryOption,
//         };

//         try {
//             if (editingOrder) {
//                 // If editing an existing order
//                 await axios.put(`${apiUrl}/${editingOrder.id}`, orderData);
//                 setSuccess('Order updated successfully!');
//                 setEditingOrder(null);
//             } else {
//                 // Creating a new order
//                 await axios.post(apiUrl, orderData);
//                 setSuccess('Payment successful! Your ebook will be delivered via ' + deliveryOption);
//             }

//             // Refetch the orders
//             fetchOrders();
//             resetForm();
//             setLoading(false);
//         } catch (err) {
//             setError('Payment failed. Please try again.');
//             setLoading(false);
//         }
//     };

//     const handleEdit = (order) => {
//         // Set the form fields to the selected order for editing
//         setName(order.name);
//         setEmail(order.email);
//         setAddress(order.address || '');
//         setCardNumber(order.cardNumber);
//         setExpiryDate(order.expiryDate);
//         setCvv(order.cvv);
//         setDeliveryOption(order.deliveryOption);
//         setEditingOrder(order);
//     };

//     const handleDelete = async (orderId) => {
//         try {
//             await axios.delete(`${apiUrl}/${orderId}`);
//             setSuccess('Order deleted successfully!');
//             fetchOrders(); // Refetch orders after deletion
//         } catch (err) {
//             setError('Failed to delete the order.');
//         }
//     };

//     const resetForm = () => {
//         setName('');
//         setEmail('');
//         setAddress('');
//         setCardNumber('');
//         setExpiryDate('');
//         setCvv('');
//         setDeliveryOption('email');
//         setEditingOrder(null);
//     };

//     return (
//         <div className="checkout-container">
//             <h2>Checkout</h2>
//             {loading && <p>Processing your payment...</p>}
//             {error && <p className="error">{error}</p>}
//             {success && <p className="success">{success}</p>}

//             <form className="checkout-form" onSubmit={handleSubmit}>
//                 <h3>{editingOrder ? 'Edit Order' : 'Delivery Information'}</h3>
//                 <div className="form-group">
//                     <label htmlFor="name">Full Name</label>
//                     <input
//                         type="text"
//                         id="name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="email">Email Address</label>
//                     <input
//                         type="email"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="address">Delivery Address (if applicable)</label>
//                     <input
//                         type="text"
//                         id="address"
//                         value={address}
//                         onChange={(e) => setAddress(e.target.value)}
//                         placeholder="Only if physical delivery"
//                     />
//                 </div>

//                 <h3>Payment Information</h3>
//                 <div className="form-group">
//                     <label htmlFor="cardNumber">Card Number</label>
//                     <input
//                         type="text"
//                         id="cardNumber"
//                         value={cardNumber}
//                         onChange={(e) => setCardNumber(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
//                     <input
//                         type="text"
//                         id="expiryDate"
//                         value={expiryDate}
//                         onChange={(e) => setExpiryDate(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="cvv">CVV</label>
//                     <input
//                         type="password"
//                         id="cvv"
//                         value={cvv}
//                         onChange={(e) => setCvv(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <h3>Delivery Method</h3>
//                 <div className="form-group">
//                     <label>
//                         <input
//                             type="radio"
//                             name="delivery"
//                             value="email"
//                             checked={deliveryOption === 'email'}
//                             onChange={(e) => setDeliveryOption(e.target.value)}
//                         />
//                         Email Delivery
//                     </label>
//                     <label>
//                         <input
//                             type="radio"
//                             name="delivery"
//                             value="postal"
//                             onChange={(e) => setDeliveryOption(e.target.value)}
//                         />
//                         Postal Delivery
//                     </label>
//                 </div>

//                 <button type="submit" className="checkout-btn" disabled={loading}>
//                     {editingOrder ? 'Update Order' : 'Submit Payment'}
//                 </button>
//             </form>

//             <h3>Order List</h3>
//             <ul>
//                 {orders.map((order) => (
//                     <li key={order.id}>
//                         {order.name} - {order.email} - {order.deliveryOption}
//                         <button onClick={() => handleEdit(order)}>Edit</button>
//                         <button onClick={() => handleDelete(order.id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Checkout;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [deliveryOption, setDeliveryOption] = useState('email');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);

    const apiUrl = 'http://localhost:8083/orders'; // API URL for the orders

    // Fetch the list of orders on component mount
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(apiUrl);
            setOrders(response.data); // Set orders from the response
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const orderData = {
            name,
            email,
            address: deliveryOption === 'postal' ? address : null, // Address only for postal delivery
            cardNumber,
            expiryDate,
            cvv,
            deliveryOption,
        };

        try {
            if (editingOrder) {
                // If editing an existing order
                await axios.put(`${apiUrl}/${editingOrder.id}`, orderData);
                setSuccess('Order updated successfully!');
                setEditingOrder(null);
            } else {
                // Creating a new order
                await axios.post(apiUrl, orderData);
                setSuccess('Payment successful! Your ebook will be delivered via ' + deliveryOption);
            }

            // Refetch the orders
            fetchOrders();
            resetForm();
            setLoading(false);
        } catch (err) {
            setError('Payment failed. Please try again.');
            setLoading(false);
        }
    };

    const handleEdit = (order) => {
        // Set the form fields to the selected order for editing
        setName(order.name);
        setEmail(order.email);
        setAddress(order.address || '');
        setCardNumber(order.cardNumber);
        setExpiryDate(order.expiryDate);
        setCvv(order.cvv);
        setDeliveryOption(order.deliveryOption);
        setEditingOrder(order);
    };

    const handleDelete = async (orderId) => {
        try {
            await axios.delete(`${apiUrl}/${orderId}`);
            setSuccess('Order deleted successfully!');
            fetchOrders(); // Refetch orders after deletion
        } catch (err) {
            setError('Failed to delete the order.');
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setAddress('');
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
        setDeliveryOption('email');
        setEditingOrder(null);
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            {loading && <p>Processing your payment...</p>}
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form className="checkout-form" onSubmit={handleSubmit}>
                <h3>{editingOrder ? 'Edit Order' : 'Delivery Information'}</h3>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Delivery Address (if applicable)</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Only if physical delivery"
                    />
                </div>

                <h3>Payment Information</h3>
                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                    <input
                        type="text"
                        id="expiryDate"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                        type="password"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                    />
                </div>

                <h3>Delivery Method</h3>
                <div className="form-group">
                    <label>
                        <input
                            type="radio"
                            name="delivery"
                            value="email"
                            checked={deliveryOption === 'email'}
                            onChange={(e) => setDeliveryOption(e.target.value)}
                        />
                        Email Delivery
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="delivery"
                            value="postal"
                            onChange={(e) => setDeliveryOption(e.target.value)}
                        />
                        Postal Delivery
                    </label>
                </div>

                <button type="submit" className="checkout-btn" disabled={loading}>
                    {editingOrder ? 'Update Order' : 'Submit Payment'}
                </button>
            </form>

            <h3>Order List</h3>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        {order.name} - {order.email} - {order.deliveryOption}
                        <button onClick={() => handleEdit(order)}>Edit</button>
                        <button onClick={() => handleDelete(order.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Checkout;
