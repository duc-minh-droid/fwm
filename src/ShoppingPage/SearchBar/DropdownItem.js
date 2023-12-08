import React from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function DropdownItem({ item, closeDropdown }) {
  const handleClick = () => {
    closeDropdown();
    // store in Inventory
    createShoppingList(item);
  };

  const checkIfFoodIDExists = async (itemID) => {
    const shoppingListCollectionRef = collection(db, "shoppingList");
    const q = query(shoppingListCollectionRef, where("foodID", "==", itemID), where("userID", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const createShoppingList = async (item) => {
    const foodIDExists = await checkIfFoodIDExists(item.id);
    if (foodIDExists) return
    const docRef = await addDoc(collection(db, "shoppingList"), {
      foodID: item.id,
      image: item.image,
      name: item.name,
      userID: auth.currentUser.uid,
      quantity: 1,
    });
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
