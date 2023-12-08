import React, { useState, useEffect } from "react";
import { db, auth } from '../../firebase'
import { doc, updateDoc } from "firebase/firestore"
import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    where,
  } from "firebase/firestore";
  import { FaDeleteLeft } from "react-icons/fa6";
  import { FaSave } from "react-icons/fa";

const rowStyle = {
    border: "1px solid #dddddd", // Add a border
};
const cellStyle = {
    padding: "8px", // Add padding to cells
    textAlign: "center", // Align text to the left
};
const checkboxStyle = {
    width: "20px",
    height: "20px",
    borderRadius: "4px",
    border: "2px solid #ccc",
};
const deleteButtonStyle = {
    backgroundColor: "#FF0000", // Light red
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s, transform 0.3s", // Added transform for click animation
};

function ShoppingRow({ item, deleteShoppingList }) {
    const [isChecked, setIsChecked] = useState(false)

    const checkIfFoodIDExists = async (itemID) => {
        const inventoryCollectionRef = collection(db, "inventory");
        const q = query(inventoryCollectionRef, where("foodID", "==", itemID), where("userID", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
      };
    
      const createInventory = async (item) => {
        const foodIDExists = await checkIfFoodIDExists(item.id);
        if (foodIDExists) return;
        const docRef = await addDoc(collection(db, "inventory"), {
          foodID: item.id,
          image: item.image,
          name: item.name,
          userID: auth.currentUser.uid,
          serverTimeStamp: serverTimestamp(),
        });
      };
      
      

    const handleCheckboxChange = (e) => {
        e.stopPropagation(); // Prevent row click when clicking the checkbox
        setIsChecked(!isChecked);
        if (!isChecked) {
            createInventory(item);
        }
    };

    const [quantity, setQuantity] = useState(item.quantity);
    const [updatedQuantity, setUpdatedQuantity] = useState(item.quantity);

    const handleIncrement = () => {
        setUpdatedQuantity(updatedQuantity + 1);
    };

    const handleDecrement = () => {
        if (updatedQuantity > 0) {
            setUpdatedQuantity(updatedQuantity - 1);
        }
    };

    const handleSave = () => {
        setQuantity(updatedQuantity);
        updateInventory(item.id, updatedQuantity)
    };
    const handleQuantityChange = (e) => {
        setUpdatedQuantity(parseInt(e.target.value) || 0);
    };
    const updateInventory = async (id, quantity) => {
        const newField = { quantity: quantity }
        const docRef = doc(db, "shoppingList", id)
        await updateDoc(docRef, newField)
    }
    const handleDelete = () => {
        deleteShoppingList(item.id)

    }

    useEffect(() => {
        const checkItemExistsInInventory = async () => {
            const inventoryCollectionRef = collection(db, "inventory");
            const q = query(
                inventoryCollectionRef,
                where("foodID", "==", item.id),
                where("userID", "==", auth.currentUser.uid)
            );

            const querySnapshot = await getDocs(q);
            setIsChecked(!querySnapshot.empty);
        };

        checkItemExistsInInventory();
    }, [item.id]);

    return (
        <tr style={rowStyle}>
            <td style={cellStyle}>
                <input
                    type="checkbox"
                    style={checkboxStyle}
                    onChange={handleCheckboxChange}
                    checked={isChecked}
                />
            </td>
            <td style={cellStyle}>{item.name}</td>
            <td style={cellStyle}>
                <button onClick={handleDecrement}>-</button>
                <input
                    type="number"
                    value={updatedQuantity}
                    onChange={handleQuantityChange}
                    style={{ width: "40px", textAlign: "center" }}
                />
                <button onClick={handleIncrement}>+</button>
            </td>

            <td style={cellStyle}>
                {isChecked ? <button
                    onClick={handleDelete}
                    style={deleteButtonStyle}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#DC143C"; // Darker shade on hover
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#FF0000"; // Light red on leave
                    }}
                    onMouseDown={(e) => {
                        e.target.style.transform = "scale(0.95)"; // Click animation
                    }}
                    onMouseUp={(e) => {
                        e.target.style.transform = "scale(1)";
                    }}
                >
                    <FaDeleteLeft />
                </button> :
                    <button onClick={handleSave}
                        style={{
                            backgroundColor: "#6fbf73",
                            color: "#fff",
                            border: "none",
                            padding: "5px 10px",
                            cursor: "pointer",
                            borderRadius: "4px",
                            transition: "background-color 0.3s, transform 0.3s",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#5ca866";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#6fbf73";
                        }}
                        onMouseDown={(e) => {
                            e.target.style.transform = "scale(0.95)";
                        }}
                        onMouseUp={(e) => {
                            e.target.style.transform = "scale(1)";
                        }}
                    ><FaSave /></button>
                }
            </td>
        </tr>
    );
}

export default ShoppingRow;
