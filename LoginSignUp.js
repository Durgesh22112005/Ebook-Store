// import React, { useState } from 'react';
// import axios from 'axios';
// import './LoginSignUp.css';

// const LoginSignUp = () => {
//   const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('/api/login', { email, password });
//       if (response.data.success) {
//         alert('Login Successful');
//         // Redirect user after login
//       } else {
//         setErrorMessage('Invalid credentials');
//       }
//     } catch (error) {
//       setErrorMessage('An error occurred. Please try again.');
//     }
//   };

//   const handleSignUp = async () => {
//     try {
//       const response = await axios.post('/api/signup', { name, email, password });
//       if (response.data.success) {
//         alert('Sign Up Successful');
//         setIsLogin(true); // Switch to login after successful sign up
//       } else {
//         setErrorMessage('Sign Up failed');
//       }
//     } catch (error) {
//       setErrorMessage('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="login-signup-container">
//       {isLogin ? (
//         <div className="login-container">
//           <h2>Login</h2>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//           <button onClick={handleLogin}>Login</button>
//           <p>Don't have an account? <span onClick={() => setIsLogin(false)}>Sign Up</span></p>
//         </div>
//       ) : (
//         <div className="signup-container">
//           <h2>Sign Up</h2>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//           <button onClick={handleSignUp}>Sign Up</button>
//           <p>Already have an account? <span onClick={() => setIsLogin(true)}>Login</span></p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginSignUp;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginSignUp.css';

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate(); // Create a navigate function

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.data.success) {
        alert('Login Successful');
        navigate('/catalog'); // Navigate to the catalog page after successful login
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('/api/signup', { name, email, password });
      if (response.data.success) {
        alert('Sign Up Successful');
        setIsLogin(true); // Switch to login after successful sign up
      } else {
        setErrorMessage('Sign Up failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-signup-container">
      {isLogin ? (
        <div className="login-container">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button onClick={handleLogin}>Login</button>
          <p>Don't have an account? <span onClick={() => setIsLogin(false)}>Sign Up</span></p>
        </div>
      ) : (
        <div className="signup-container">
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button onClick={handleSignUp}>Sign Up</button>
          <p>Already have an account? <span onClick={() => setIsLogin(true)}>Login</span></p>
        </div>
      )}
    </div>
  );
};

export default LoginSignUp;
