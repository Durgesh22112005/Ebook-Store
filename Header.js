import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo"><h1><i>Ebook Store</i></h1></div>
      <nav className="nav">
        
        <h1><ul>
          <li><Link to="/catalog">Catalog</Link></li>
          <li><Link to="/ebookreader">EbookReader</Link></li>
          <li><Link to="/reviews">User Reviews</Link></li>
          <li><Link to="/checkout">Checkout</Link></li>
          <li><Link to="/account">My Account</Link></li>
        </ul>
        </h1>
        <li>
            <Link to="/loginsignUp">
                           <button className="nav-button">Login</button>
            </Link>
           </li>
      </nav>
    </header>
  );
};

export default Header;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css';

// const Header = () => {
//   return (
//     <header className="header">
//       <div className="logo"><h1><i>Ebook Store</i></h1></div>
//       <nav className="nav">
//         <ul>
//           <li>
//             <Link to="/catalog">
//               <button className="nav-button">Catalog</button>
//             </Link>
//           </li>
//           <li>
//             <Link to="/ebookreader">
//               <button className="nav-button">EbookReader</button>
//             </Link>
//           </li>
//           <li>
//             <Link to="/reviews">
//               <button className="nav-button">User Reviews</button>
//             </Link>
//           </li>
//           <li>
//             <Link to="/checkout">
//               <button className="nav-button">Checkout</button>
//             </Link>
//           </li>
//           <li>
//             <Link to="/account">
//               <button className="nav-button">My Account</button>
//             </Link>
//           </li>
//           <li>
//             <Link to="/loginsignUp">
//               <button className="nav-button">Login</button>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;
