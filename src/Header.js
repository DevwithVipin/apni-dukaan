import React from 'react';
import './Header.css';
 import SearchIcon from '@mui/icons-material/Search';
 import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
 import { Link } from "react-router-dom";
 import { useStateValue } from "./StateProvider"


function Header() {
    const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="header">
       <Link to="/"> <img className="header__logo"
        src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"/></Link>
        <div className="header__search">
            <input className="header__searchInput" type="text"/>
            <SearchIcon className="header__searchIcon" />
        </div>
        <div className="header__nav">
          <Link to="/Login">
        
          <div className="header__option">
            <span className="header__optionLineone">Hello Guest</span>
            <span className="header__optionLinetwo">Sign In</span>
          </div>  </Link>
          <div className="header__option">
            <span className="header__optionLineone">Returns</span>
            <span className="header__optionLinetwo">& Orders</span>
          </div>
          <div className="header__option">
            <span className="header__optionLineone">Your</span>
            <span className="header__optionLinetwo">Prime</span>
          </div>
          <Link to="/Checkout">  <div className="header__optionBasket">
            <ShoppingBasketIcon/>
            <span className="header_optionLinetwo header_optionBasketCount">{basket?.length}</span>
          </div></Link>
        
        


        </div>
      
    </div>
  )
}

export default Header;