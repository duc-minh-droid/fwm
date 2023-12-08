import React from 'react'
import { NavLink } from 'react-router-dom'

function NavItem({children, to}) {
  return (
    <NavLink to={to}>
        <div className='nav-item'>
        {children}

        </div>
        </NavLink>
  )
}

export default NavItem