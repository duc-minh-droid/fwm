import React, { useEffect, useRef, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from '../../firebase'
import { doc, updateDoc } from "firebase/firestore"

function InventoryModal({item: {id, foodID}, closeModal, openModal}) {
    const [startDate, setStartDate] = useState(new Date());
    const handleDateChange = (date) => {
        setStartDate(date)
        // Update date to the database
        updateInventory(id, date)
    }
    const updateInventory = async (id, date) => {
        const newField = {expiryDate: date}
        const docRef = doc(db, "inventory", id)
        await updateDoc(docRef, newField)
    }   
    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: openModal ? 'block' : 'none',
        zIndex: 999,
    };
    const modalRef = useRef()

    const [inventoryItem, setInventoryItem] = useState({})
    const [loading, setLoading] = useState(true)

    const fetchInventoryItem = (id) => {
        const apiKey = process.env.REACT_APP_API_KEY
        const url = `https://api.spoonacular.com/food/ingredients/${id}/information?amount=1&apiKey=${apiKey}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setInventoryItem(data)
                setLoading(false)
            })
    }

    useEffect(()=>{
        let handler = e => {
            if (!modalRef.current) return
            if (!modalRef.current.contains(e.target)) {
                closeModal()
            }
        }

        document.addEventListener("mousedown", handler)
    })
    useEffect(() => {
        if (openModal) {
            fetchInventoryItem(foodID);
        }
    }, [foodID, openModal]);

  return (
        <div style={modalStyle} ref={modalRef}>
                    {(openModal && !loading) ? (
                        <div>
                        <div>Calories: {inventoryItem.nutrition.nutrients.find(nutrient => nutrient.name === 'Calories')?.amount} {inventoryItem.nutrition.nutrients.find(nutrient => nutrient.name === 'Calories')?.unit}</div>
                        <div>Fat: {inventoryItem.nutrition.nutrients.find(nutrient => nutrient.name === 'Fat')?.amount} {inventoryItem.nutrition.nutrients.find(nutrient => nutrient.name === 'Fat')?.unit}</div>
                        <div>Saturated Fat: {inventoryItem.nutrition.nutrients.find(nutrient => nutrient.name === 'Saturated Fat')?.amount} {inventoryItem.nutrition.nutrients.find(nutrient => nutrient.name === 'Saturated Fat')?.unit}</div>
                        <div>Sugar: {inventoryItem.nutrition.nutrients.find(nutrient => nutrient.name === 'Sugar')?.amount} {inventoryItem.nutrition.nutrients.find(nutrient => nutrient.name === 'Sugar')?.unit}</div>
                        <div>Protein: {inventoryItem.nutrition.nutrients.find(nutrient => nutrient.name === 'Protein')?.amount} {inventoryItem.nutrition.nutrients.find(nutrient => nutrient.name === 'Protein')?.unit}</div>
                        <div>Category: {inventoryItem.categoryPath.join(', ')}</div>
                        <div>
                          Add expiry date: <DatePicker selected={startDate} onChange={handleDateChange} />
                        </div>
                      </div>
                    ): <div>Loading...</div>}
        </div>
  )
}

export default InventoryModal