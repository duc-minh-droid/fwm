import React, { useEffect, useRef, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import InventoryModal from './InventoryModal';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

function InventoryItem({item}) {
    // console.log(item)
    const [openModal, setOpenModal] = useState(false)
    const handleClick = () => {
        setOpenModal(true)
    }
    const closeModal = () => {
        setOpenModal(false);
    };
    const handleDelete = (e) => {
        e.stopPropagation();
        closeModal()
        const deleteInventoryItem = async (id) => {
            await deleteDoc(doc(db, "inventory", id));
        }
        deleteInventoryItem(item.id)
    }
    if (item==null) return;
  return (
    <> 
         <li className='inven-item' onClick={handleClick} 
        >{item.name}
        <button className='inven-btn' onClick={handleDelete}><IoMdClose /></button>
        </li>
        <InventoryModal item={item} closeModal={closeModal} openModal={openModal}/>
    </>
  )
}

export default InventoryItem