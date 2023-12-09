import React, { useState } from 'react'
import DropdownMenu from './DropdownMenu'
import { CiSearch } from "react-icons/ci";
    
    function SearchBar() {
        const [query, setQuery] = useState("")
        const [openDropdown, setOpenDropdown] = useState(false)
        const [dropDownData, setDropDownData] = useState([])
        const handleChange = (e) => {
            setQuery(e.target.value)
            if (e.target.value.length >= 3) {
                // setDropDownData(data)
                fetchIngredientQuery(query)
                setOpenDropdown(true)
            } else {
                setOpenDropdown(false)
            }
        }
        
        const fetchIngredientQuery = (query) => {
            const apiKey = process.env.REACT_APP_API_KEY
            //https://api.spoonacular.com/food/ingredients/search?query=ban&number=8&sort=calories&sortDirection=desc&apiKey=3f7a7932fbb44f889cbfcdd9dd7ee41e
            const url = `https://api.spoonacular.com/food/ingredients/search?query=${query}&number=10&apiKey=${apiKey}`
            fetch(url)
                .then(res=>res.json())
                .then(data => {
                    setDropDownData(data.results)
                })
        }

  return (
    <div style={{width: '100%', position: 'relative'}}>
        <input
            type="text"
            placeholder="🔎     Add ingredient"
            onChange={handleChange}
            value={query}
            className='ing-sb'
        />
        {openDropdown && !dropDownData.length && <DropdownMenu data={[{name: "No result found"}]} closeDropdown={()=>setOpenDropdown(false)}/>}
        {openDropdown && <DropdownMenu data={dropDownData} closeDropdown={()=>setOpenDropdown(false)}/>}
    </div>
  )
}

export default SearchBar