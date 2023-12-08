import React, { useState, useEffect, useCallback } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function DropdownItem({ item, closeDropdown }) {

    const checkIfFoodIDExists = async (itemID) => {
        const inventoryCollectionRef = collection(db, "inventory");
        const q = query(inventoryCollectionRef, where("foodID", "==", itemID), where("userID", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
      };
    const createInventory = useCallback(async (item) => {
        if (item.id) {
            const foodIDExists = await checkIfFoodIDExists(item.id);
            if (foodIDExists) return;
        }
        const docRef = await addDoc(collection(db, "inventory"), {
            image: item.image,
            name: item.name,
            userID: auth.currentUser.uid,
            serverTimeStamp: serverTimestamp(),
            foodID: item.id
        });
    }, [item.id, checkIfFoodIDExists]);
    
    const handleClick = () => {
        closeDropdown();
        // store in Inventory
        createInventory(item);
    };

  return (
    <li
      onClick={handleClick}
    >
      {item.name}
    </li>
  );
}

export default DropdownItem;
