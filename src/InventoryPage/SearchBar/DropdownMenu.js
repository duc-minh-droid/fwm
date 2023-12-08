import React, { useState, useRef, useEffect } from 'react'
import DropdownItem from './DropdownItem'
  
  const ulStyle = {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  };

  function DropdownMenu({ data, closeDropdown }) {
    const dropdownRef = useRef(null);
  
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [dropdownRef, closeDropdown]);

    return (
      <div ref={dropdownRef} className='dropdown-menu'>
        <ul style={ulStyle}>
          {data.map((item, index) => (
            <DropdownItem key={index} item={item} closeDropdown={closeDropdown} />
          ))}
        </ul>
      </div>
    );
  }

export default DropdownMenu