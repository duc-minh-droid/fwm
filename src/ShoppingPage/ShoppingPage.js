import React from 'react'
import SearchBar from './SearchBar/SearchBar'
import ShoppingTable from './ShoppingTable/ShoppingTable'

function ShoppingPage() {
  return (
    <div className='sp-page'>
        <SearchBar />
        <ShoppingTable />
    </div>
  )
}

export default ShoppingPage