import React, { useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import Recipes from './Recipes/Recipes'
import Inventory from './Inventory/Inventory'
import ExpiringIngredients from './ExpiringIngredients/ExpiringIngredients'
import '../index.css'

function InventoryPage() {
    

  return (
    <div className='inventory-page'>
        <div className='ip-left'>
        <Inventory />
        <ExpiringIngredients />
        </div>
        <div className='ip-right'>
        <SearchBar/>
        <Recipes />
        </div>
    </div>
  )
}

export default InventoryPage