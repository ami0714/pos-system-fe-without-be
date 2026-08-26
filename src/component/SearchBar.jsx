import React from 'react';
import { Icon } from '@iconify/react';
import '../component/SearchBar.css';

  const SearchBar = ({onValue}) => {
  return (
     <div className="search-box">
          <span className="search-icon"><Icon icon="material-symbols:search"/></span>
          <input onChange={(e)=>onValue(e.target.value)} type="text" placeholder="search product" className="search-input" />
        </div>
  )
 
}
 export default SearchBar;