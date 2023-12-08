import React, { useEffect, useState } from 'react'
import { db, auth } from '../../firebase'
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import ExpiringIngredient from './ExpiringIngredient'
import { deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { FaCarrot } from "react-icons/fa";

function ExpiringIngredients() {
    const [inventory, setInventory] = useState([])

    useEffect(() => {
        const fetchData = async (uid) => {
            const unsubscribe = onSnapshot(
                query(collection(db, "inventory"), where("userID", "==", uid), where('expiryDate', '!=', null), // Select only documents with expiryDate field
                    orderBy('expiryDate')),
                (snapshot) => {
                    const updatedInventory = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                    setInventory(updatedInventory);
                }
            );

            return () => unsubscribe();
        }

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const uid = user.uid;
                fetchData(uid);
            } else {
                // User is signed out
                // Clear inventory or perform other actions as needed
                setInventory([]);
            }
        });

        return () => {
            unsubscribeAuth();
        };
    }, []);

    const handleDelete = (id) => {
        const deleteInventoryItem = async (id) => {
            await deleteDoc(doc(db, "inventory", id));
        }
        deleteInventoryItem(id)
        setInventory(prev => prev.filter(item => item.id !== id))
    }

    return (
        <div className='exp'>
            <div className='title-icon'><FaCarrot />Expiring</div>
            <ul>
                {inventory.length ? inventory.map((item, key) => <ExpiringIngredient item={item} key={key} handleDelete={handleDelete} />) : (<li>No expiring ingredients</li>)}
            </ul>
        </div>
    )
}

export default ExpiringIngredients