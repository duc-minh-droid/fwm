import React from 'react'
import Register from './Register/Register'
import { NavLink} from 'react-router-dom'
import NavItem from './NavItem'

function NavBar() {
  return (
    <nav className='navbar'>
        <div className='nav-items'>
            <NavItem to="/">Main</NavItem>
            <NavItem to="/inventory">Inventory</NavItem>
            <NavItem to="/shoppingList">Shopping List</NavItem>
        </div>
        <Register />
    </nav>
  )
}

export default NavBar