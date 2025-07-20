import { useContext, useState } from 'react';
import { CDN_Logo } from '../../util/constants';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../../util/useOnlineStatus';
import UserContext from '../../util/UserContext';
import { useSelector } from 'react-redux';
import logo from './Images/CDN.png';

export const Header = () => {
  const [btnName, setBtnName] = useState('Login');
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems);

  return (
    <div className="flex justify-between bg-pink-100 shadow mb-2">
      <div className="logo-container">
        <img src={logo} alt="app logo" className="w-32 m-2" />
      </div>
      <div className="flex align items-center">
        <ul className="flex p-4 m-4 ">
          <li className="px-4">Online Status: {onlineStatus ? '✅' : '🔴'}</li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>

          <li className="px-4">
            <Link to="/cart">Cart({cartItems.length})</Link>
          </li>
          <button
            className="px-4  bg-green-100   border-0 shadow"
            onClick={() => {
              btnName === 'Login' ? setBtnName('Logout') : setBtnName('Login');
            }}>
            {btnName}
          </button>
          <li className="px-4">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
